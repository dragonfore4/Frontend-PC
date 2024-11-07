import ProductImages from '@/components/default/ProductImages';
import { getAllProjectDetails } from '@/functions/projects';
import Image from 'next/image';
import React from 'react';
import type { carboncreditsType, Project } from '@/types/type';
import { read } from 'fs';
import { readCarbonCredit } from '@/functions/carboncredit';

const ProjectIdPage = async ({ params }: { params: { slug: string } }) => {
    const res = await getAllProjectDetails(parseInt(params.slug));
    const resCarbonCredit = await readCarbonCredit(parseInt(params.slug));

    // Check if the response is OK
    if (!res || !res.ok || !resCarbonCredit || !resCarbonCredit.ok) {
        return <div>Error loading project data.</div>;
    }

    // Parse the JSON response
    const data = await res.json();
    const carbonCredit = await resCarbonCredit.json();

    // Filter out items with non-null credit_amount and calculate sum and mean
    const validCredits = carbonCredit.filter((c: carboncreditsType) => c.credit_amount != null);
    const sumCarbonCredit = validCredits.reduce((acc: number, cur: carboncreditsType) => acc + parseFloat(cur.credit_amount), 0);

    const meanCarbonCredits = sumCarbonCredit / validCredits.length;
    const projectData: Project = data[0]; // Adjust this if your data is nested

    // Ensure projectData exists
    if (!projectData) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options).replace(/,/g, '');
    };

    const calculateProjectDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const diffMonths = Math.floor((diffDays % 365) / 30);

        return `${diffYears} ปี ${diffMonths} เดือน`;
    };

    const images = {
        image1: projectData.image1,
        image2: projectData.image2,
        image3: projectData.image3,
    };

    const dates = {
        start_Date: formatDate(projectData.start_date),
        end_Date: formatDate(projectData.end_date),
        issued_Date: formatDate(projectData.issued_date),
        expiry_Date: formatDate(projectData.expiry_date),
    };

    const projectAge = calculateProjectDuration(projectData.start_date, projectData.end_date);

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
                <ProductImages images={images} />
                {/* <button className='rounded-xl px-2 py-4 ring-1 ring-red-400 w-max'>Add to Cart</button> */}


            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-5xl font-bold">{projectData.project_name}</h1>
                <p className="text-gray-500">{projectData.description}</p>
                <div className="h-[2px] bg-gray-100" />
                <div className="flex justify-between">
                    <h2 className="font-bold text-2xl">${projectData.price}</h2>
                    <div className="flex justify-center items-center">
                        <Image
                            src="https://png.pngtree.com/png-vector/20230313/ourmid/pngtree-cartoon-leaf-illustration-vector-png-image_6644591.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                        <h2 className="font-medium text-xl text-green-600 pl-2 ">Average: {meanCarbonCredits ? meanCarbonCredits.toFixed(2) : 0} TONS/YEARS</h2>
                    </div>
                </div>
                <div className="h-[2px] bg-gray-100" />
                <h2 className="text-3xl font-semibold">Project Info :</h2>
                <ul className="flex flex-col gap-2">
                    <li>
                        Country: <span className="text-gray-500">Kingdom of Thailand</span>
                    </li>
                    <li>
                        Region/State/Province etc: <span className="text-gray-500">Samutprakarn</span>
                    </li>
                    <li>
                        Start Date(SITE): <span className="text-gray-500">{dates.start_Date}</span>
                    </li>
                    <li>
                        End Date(SITE): <span className="text-gray-500">{dates.end_Date}</span>
                    </li>
                    <li>
                        อายุโครงการ: <span className="text-gray-500">{projectAge}</span>
                    </li>
                    <li>
                        Project Type: <span className="text-gray-500">{projectData.project_type_name}</span>
                    </li>
                </ul>
                <div className="h-[2px] bg-gray-100" />
                <h2 className="text-3xl font-semibold">Certification Info :</h2>
                <ul className="flex flex-col gap-2">
                    <li>
                        Certification Name: <span className="text-gray-500">{projectData.certification_name}</span>
                    </li>
                    <li>
                        Certification Agency: <span className="text-gray-500">{projectData.certification_agency}</span>
                    </li>
                    <li>
                        Issued Date: <span className="text-gray-500">{dates.issued_Date}</span>
                    </li>
                    <li>
                        Expired Date: <span className="text-gray-500">{dates.expiry_Date}</span>
                    </li>
                    <li>
                        อายุโครงการ: <span className="text-gray-500">{projectAge}</span>
                    </li>
                    <li className='mb-2'>
                        Project Type: <span className="text-gray-500">{projectData.project_type_name}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProjectIdPage;
