"use client"
import AllProject from '@/components/default/(admin)/AllProject'
import ApprovedProject from '@/components/default/(admin)/ApprovedProject'
import PendingProjects from '@/components/default/(admin)/PendingProjects'
import UsersList from '@/components/default/(admin)/UsersList'
import React, { useState } from 'react'

const AdminPage = () => {

    const [currentPage, setCurrentPage] = useState(0)

    const pages = [
        {
            name: "All Projects",
            page: <AllProject/>
        }, {
            name: "Approved Projects",
            page: <ApprovedProject/>
        }, {
            name: "Pending Projects",
            page: <PendingProjects/>
        }, {
            name: "Users",
            page: <UsersList/>

        }, {
            name: "Update Carboncredit"
        }
    ]

    return (
        <div className='flex flex-row mt-5'>
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

export default AdminPage
