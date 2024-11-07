"use client"
import Transactions from '@/components/default/(user)/Transactions'
import AllProject from '@/components/default/(user)/AllProject'
import PendingProjects from '@/components/default/(user)/PendingProjects'
import UsersList from '@/components/default/(user)/UsersList'
import React, { useState } from 'react'

const ProfilePage = () => {

    const [currentPage, setCurrentPage] = useState(0)

    const pages = [
        {
            name: "All Projects",
            page: <AllProject/>
        }, {
            name: "Approved Projects",
            page: <AllProject/>
        }, {
            name: "Pending Projects",
            page: <PendingProjects/>
        }, {
            name: "Transactions",
            page: <Transactions/>
        }
    ]

    return (
        <div className='flex flex-row'>
            {/* LEFT PANEL */}
            <div className='w-1/6 min-h-[calc(100vh-100px)] bg-[#f7f7f9] border-r-2 border-gray-600  '>
                <span className='text-black relative ml-4 mt-4 block text-xl'>Pages</span>
                <ul className='mx-2'>
                    {pages.map((page, index) => (
                        <li key={index} className={`text-base mt-2 px-4 py-3 text-black hover:bg-[#3c4963]  hover:text-white rounded-lg ${currentPage == index ? "bg-[#2d3648] text-white" : ""}`} onClick={() => setCurrentPage(index)}>{page.name}</li>
                    ))}
                </ul>
            </div>
            {/* RIGHT Panel */}
            <div className='w-5/6 p-8 bg-[#f7f7f9]'>
                {pages[currentPage].page}
            </div>
        </div>
    )
}

export default ProfilePage
