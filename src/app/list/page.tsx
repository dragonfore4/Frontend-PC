"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Filter from '@/components/default/Filter';
import { Project } from '@/types/type';
import { listAllProjectDetails } from '@/functions/projects';
import ProductList2 from '@/components/default/ProductList2';

import { useSearchParams } from 'next/navigation'

const PROJECTS_PER_PAGE = 12;

const ListPage = () => {
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10000;
    const finalLimit = limit ? limit : 10000;

    const projectTypeId = searchParams.get("projectTypeId") || undefined
    const min = searchParams.get("min") ? parseInt(searchParams.get("min") as string) : undefined;
    const max = searchParams.get("max") ? parseInt(searchParams.get("max") as string) : undefined;

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsEachPage, setProjectsEachPage] = useState<Project[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    // Fetch data based on filters
    const fetchData = async () => {
        const response = await listAllProjectDetails(finalLimit, projectTypeId, min, max);

        if (response.ok) {
            const data = await response.json();
            const result = data.filter((d: Project) => d.status_id == 2);
            console.log("result: ", data)
            setProjects(result);
        } else {
            setProjects([]);
        }
    };

    // Handle pagination
    const handleProjectEachPage = () => {
        const startIdx = (currentPageNumber - 1) * PROJECTS_PER_PAGE;
        const endIdx = startIdx + PROJECTS_PER_PAGE;
        setProjectsEachPage(projects.slice(startIdx, endIdx));
    };

    // Re-fetch data when filters change
    useEffect(() => {
        fetchData();
        setCurrentPageNumber(1)
    }, [searchParams]);

    // Update projects for the current page when data or page number changes
    useEffect(() => {
        handleProjectEachPage();
    }, [projects, currentPageNumber]);

    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            {/* CAMPAIGN SECTION */}
            <div className="hidden bg-green-50 px-4 sm:flex justify-between h-64">
                <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
                        Lorem ipsum dolor sit amet. <br />Selected products
                    </h1>
                    <button className="rounded-3xl bg-red-300 text-black py-3 px-5 text-sm">
                        Buy now
                    </button>
                </div>
                <div className="relative w-1/3">
                    <Image src="/cc.png" alt="Campaign Image" fill className="object-contain" />
                </div>
            </div>

            {/* FILTER COMPONENT */}
            <Filter />

            {/* PRODUCT LIST */}
            <Suspense fallback={"loading..."}>
                <ProductList2 ProjectsData={projectsEachPage} />
            </Suspense>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className='mt-6'>
                    <ul className='flex justify-center'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 cursor-pointer ${index + 1 === currentPageNumber ? 'bg-blue-300' : ''}`}
                                onClick={() => setCurrentPageNumber(index + 1)}
                            >
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ListPage;
