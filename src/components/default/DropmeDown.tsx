"use client";
import { listProjectsTypes } from '@/functions/project_types';
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface ProjectType {
  project_type_id: number;
  project_type_name: string;
}

const DropmeDown = ({ selectedProjectType, onSelect }: { selectedProjectType: number | undefined, onSelect: (value: number) => void }) => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [projectType, setProjectType] = useState<string | null>(null);
    const [projectTypeFetch, setProjectTypeFetch] = useState<ProjectType[]>([]);

    const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = Number(e.currentTarget.getAttribute("data-value"));
        onSelect(value);
        setOpenDropDown(false);  // Close dropdown after selection
    }

    const projecttypesData = async () => {
        const response = await listProjectsTypes();
        if (response.ok) {
            const result = await response.json();
            setProjectTypeFetch(result);
        }
    }

    const convertType = (value: number | undefined) => {
        if (value) {
            const selectedType = projectTypeFetch.find(type => type.project_type_id === value);
            setProjectType(selectedType ? selectedType.project_type_name : "Select Project Type");
        } else {
            setProjectType("Select Project Type");
        }
    }

    useEffect(() => {
        projecttypesData();  // Fetch data on component mount
    }, []);

    useEffect(() => {
        convertType(selectedProjectType);  // Convert type whenever selectedProjectType changes
    }, [selectedProjectType, projectTypeFetch]);  // Add projectTypeFetch as a dependency

    return (
        <div className='relative'>
            {/* Button to toggle dropdown */}
            <div
                className='flex items-center bg-white border-gray-300 border-[1px] rounded-l rounded-r py-2 shadow font-medium text-sm cursor-pointer'
                onClick={() => setOpenDropDown(prev => !prev)}
            >
                <div className='flex-1 text-center'>
                    {projectType || "Select Project Type"}
                </div>
                {openDropDown ? (<RiArrowDropUpLine size={24} />) : (<RiArrowDropDownLine size={24} />)}
            </div>

            {/* Dropdown container */}
            <div
                className={`p-1 bg-white absolute w-[100%] mt-2 shadow-xl transition-all duration-500 ease-in-out transform origin-top border-[1px] border-slate-200  ${openDropDown ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                <div className='px-2 py-1.5 text-sm font-semibold'>Project Type</div>
                {/* Dropdown Content */}
                <ul className="py-2">
                    {projectTypeFetch && projectTypeFetch.map((type) => (
                        <li
                            key={type.project_type_id}
                            className="py-1.5 pl-8 text-sm hover:bg-gray-200"
                            data-value={type.project_type_id}
                            onClick={handleSelect}
                        >
                            {type.project_type_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropmeDown;
