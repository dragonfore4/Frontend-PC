import { listCarbonCredit } from '@/functions/carboncredit';
import { listTransactions } from '@/functions/transactions';
import type { Transaction } from '@/types/type';
import React, { useEffect, useState } from 'react'

interface listCarbonCreditByProjectIdType {
    carbon_credit_id: number;
    transaction_id: number;
    credit_start_date: string;
    credit_end_date: string;
    credit_amount: number;
    project_id: number;
}

const Transactions = () => {
    const PROJECTS_PER_PAGE = 10;

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionEachPage, setTransactionsEachPage] = useState<Transaction[]>([]);
    const [isOpenSlip, setIsOpenSlip] = useState<boolean>(false);
    const [slip, setSlip] = useState<listCarbonCreditByProjectIdType[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    const fetchData = async () => {
        const response = await listTransactions();
        if (response.ok) {
            const data = await response.json();
            data.map((d: Transaction) => d.transaction_date = new Date(d.transaction_date))
            setTransactions(data);
        }
    };

    const handleTransactionsEachPage = () => {
        const lastIndex = currentPageNumber * PROJECTS_PER_PAGE;
        const firstIndex = lastIndex - PROJECTS_PER_PAGE;
        const transactionsThisPage = transactions.slice(firstIndex, lastIndex);
        setTransactionsEachPage(transactionsThisPage);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleTransactionsEachPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions, currentPageNumber]);

    const handleOpenSlip = async (transaction_id: number) => {

        const response = await listCarbonCredit();
        if (response == null) {
            return (
                <div className="flex items-center justify-center h-screen">

                    <div className="text-red-500 text-xl font-bold">Failed to fetch data</div>
                </div>
            );
        }
        if (response.ok) {
            const result = await response.json();
            setSlip(result.filter((d: listCarbonCreditByProjectIdType) => d.transaction_id === Number(transaction_id)));
        }


        setIsOpenSlip(!isOpenSlip);
    }

    const totalPages = Math.ceil(transactions.length / PROJECTS_PER_PAGE);


    return (
        <div className='relative h-full'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className=' text-2xl font-semibold '>Transaction History</h1>
                <div className='h-[1px] bg-gray-300' />
            </div>

            <div className='bg-white p-4 rounded shadow'>
                <table className="w-full">
                    <thead>
                        <tr className='text-left text-gray-500'>
                            <th className='py-2'>Receipt No.</th>
                            <th className='py-2'>Transaction Time</th>
                            <th className='py-2'>Price</th>
                            <th className='py-2 '>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionEachPage.length > 0 ? (
                            transactionEachPage.map((transaction, index) => (
                                <tr key={index} className='border-b'>
                                    <td className='py-4 flex items-center'>
                                        <div className='font-semibold'>#{transaction.transaction_id}</div>
                                    </td>
                                    <td className=''>{transaction.transaction_date.toLocaleString()}</td>
                                    <td className=''>{transaction.amount}$</td>
                                    <td className='cursor-pointer translate-x-4 text-white text-md font-bold rounded-full px-4 py-2 w-max h-max bg-blue-500 inline-block' onClick={() => handleOpenSlip(transaction.transaction_id)}>?</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className='text-center py-4'>No transactions available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {
                (
                    // <div className='absolute w-full h-full bg-slate-600  rounded-lg shadow-xl top-0 text-white overflow-y-auto transition-all ease-in-out duration-700'>
                    <div
                        className={`absolute  inset-0 bg-slate-500 rounded-lg shadow-xl text-white overflow-y-auto transition-all ease-in-out duration-500
                    ${isOpenSlip ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    >
                        <div className='text-white flex justify-end ' onClick={() => setIsOpenSlip(false)}>
                            <p className='rounded-full bg-blue-500 px-4 py-2 mr-3 mt-2 text-xl text-white'>x</p>
                        </div>
                        <div className=" mx-auto p-8">
                            <h1 className="text-3xl font-bold mb-6 text-center">Carbon Credit Details</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {slip.length > 0 ? slip.map((d: listCarbonCreditByProjectIdType, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <h2 className="text-xl font-semibold mb-4 text-black">Carbon Credit #{d.carbon_credit_id}</h2>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Transaction ID:</span>{' '}
                                            {d.transaction_id ? d.transaction_id : 'N/A'}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Project ID:</span> {d.project_id}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Start Date:</span> {d.credit_start_date.split('T')[0]}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">End Date:</span> {d.credit_end_date.split('T')[0]}
                                        </p>
                                        <p className="text-green-700">
                                            <span className="font-medium">Credit Amount:</span>{' '}
                                            {d.credit_amount ? d.credit_amount : 'N/A'} tons
                                        </p>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500">Loading...</div>
                                )}
                            </div>


                        </div>
                    </div>
                )
            }

            {/* Pagination */}
            <div className='mt-6'>
                <ul className='flex justify-center'>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`px-4 py-2 cursor-pointer ${index + 1 === currentPageNumber ? 'bg-blue-300' : ''}`} onClick={() => setCurrentPageNumber(index + 1)}>
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Transactions