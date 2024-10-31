"use client"
import { listCarbonCreditByProjectId, update } from '@/functions/carboncredit';
import React, { useEffect, useState } from 'react';

interface listCarbonCreditByProjectIdType {
    carbon_credit_id: number;
    transaction_id: number;
    credit_start_date: string;
    credit_end_date: string;
    credit_amount: number;
    project_id: number;
}

const UpdateCarbonCreditPage = ({ params }: { params: { slug: string } }) => {

    const [data, setData] = useState<listCarbonCreditByProjectIdType[]>([]);
    const [currentForm, setCurrentForm] = useState<number>(0);

    const fetchData = async () => {
        const response = await listCarbonCreditByProjectId(parseInt(params.slug));
        if (response == null) {
            return (
                <div className="flex items-center justify-center h-screen">
                    
                    <div className="text-red-500 text-xl font-bold">Failed to fetch data</div>
                </div>
            );
        }
        if (response.ok) {
            const result = await response.json();
            setData(result);
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const carbon_amount = Number(formData.get('carbon_amount'));

        const response = await update(data[currentForm].carbon_credit_id, carbon_amount);

        if (response && response.ok) {
            console.log("complete")
            fetchData();
        }
        
        // const response = await
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className=" mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Carbon Credit Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.length > 0 ? data.map((d: listCarbonCreditByProjectIdType, index: number) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        onClick={() => setCurrentForm(index)}
                    >
                        <h2 className="text-xl font-semibold mb-4">Carbon Credit #{d.carbon_credit_id}</h2>
                        <p className="text-gray-700">
                            <span className="font-medium">Transaction ID:</span>{' '}
                            {d.transaction_id ? d.transaction_id : 'N/A'}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Start Date:</span> {d.credit_start_date}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">End Date:</span> {d.credit_end_date}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Credit Amount:</span>{' '}
                            {d.credit_amount ? d.credit_amount : 'N/A'} tons
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Project ID:</span> {d.project_id}
                        </p>
                    </div>
                )) : (
                    <div className="text-center text-gray-500">Loading...</div>
                )}
            </div>

            {data.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <h1 className='text-3xl font-bold mt-10 mb-6 text-center'>Update Carbon Credit form</h1>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-col justify-center items-center  shadow-md rounded-lg border border-gray-200 w-max p-6'>
                            <h2 className='text-lg font-semibold'>Carbon Credit #{data[currentForm].carbon_credit_id}</h2>
                            <p>Transaction ID: {data[currentForm].transaction_id || 'N/A'}</p>
                            <label>Edit CarbonCredit Amount</label>
                            <input name="carbon_amount" type="number" className='border border-gray-200 focus:outline-none block' />
                            {/* Add more input fields for updating data */}
                            <button>submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateCarbonCreditPage;
