"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import DropmeDown from '@/components/default/DropmeDown'
import { useAuth } from '@/contexts/AuthContext'
import { getUserIdByUsername } from '@/functions/auth'
import { showToast } from '@/utils/toastUtils'
import { MdEdit } from "react-icons/md";
import { CreateProjectType } from '@/types/type'
import { createProject } from '@/functions/projects'
import { ToastContainer } from 'react-toastify'


const AddProduct2 = () => {
    const auth = useAuth();
    const [form, setForm] = useState<CreateProjectType>({
        project_name: undefined,
        price: undefined,
        description: undefined,
        start_date: undefined,
        end_date: undefined,
        project_type_id: undefined,
        created_by: 0,
        certification_name: undefined,
        certification_agency: undefined,
        issued_date: undefined,
        expiry_date: undefined,
        file1: undefined,
        file2: undefined,
        file3: undefined,
    });

    const [projectType, setProjectType] = useState<number | undefined>();
    const [imagesSample, setImagesSample] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        // ตรวจสอบว่าชื่อฟิลด์คือ "file" หรือไม่
        if ((name === 'file1' || name === "file2" || name === "file3") && files && files.length > 0) {
            // if (name === 'file' && files && files.length > 0) {
            setForm({
                ...form,
                [name]: files[0],  // อัปเดตฟิลด์ file ด้วยไฟล์ที่ผู้ใช้เลือก
            });
        } else if (name === 'price') {
            setForm({
                ...form,
                [name]: value ? Number(value) : undefined,
            })
        } else {
            setForm({
                ...form,
                [name]: value,  // อัปเดตฟิลด์ทั่วไปใน form
            });
        }
    };

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,  // อัปเดตฟิลด์ทั่วไปใน form
        });

    };
    useEffect(() => {
        setForm((prevform) => ({
            ...prevform,
            project_type_id: projectType || 1,
        }));
    }, [projectType]);

    const product = {
        product_name: "Product Name",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas, fuga vel aspernatur reiciendis suscipit incidunt nostrum nobis. Debitis, id?",
        prices: 45,
        startDate: "",
        endDate: "",
        project_type: 1,
        carbon_credit: 440
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formWithImageData = new FormData();

        // Loop through each key in the form
        for (const key in form) {
            const value = form[key as keyof typeof form]; // Get value from form using key

            // Skip checking for file1, file2, file3
            if (['file1', 'file2', 'file3'].includes(key)) {
                if (value instanceof File) {
                    formWithImageData.append(key, value); // Add file to FormData
                }
                continue; // Skip to the next iteration
            }

            // Check if the value is null or undefined
            if (value === null || value === undefined) {
                showToast(`The required value for ${key} is missing`, "error");
                return;
            }

            // If it's a regular field (string, number), convert to string
            formWithImageData.append(key, String(value));
        }

        if (!auth || !auth.user) {
            console.error("User is not authenticated.");
            showToast("Login First!", "error");
            return;
        }

        try {
            // Add 'created_by' field to the form data
            const user_id_response = await getUserIdByUsername(auth.user);
            const user_id_json = await user_id_response.json();
            const user_id = user_id_json[0].user_id;

            formWithImageData.set("created_by", String(user_id)); // Add created_by

            const response = await createProject(formWithImageData); // Send formWithImageData
            const result = await response?.json();

            if (response && response.ok) {
                showToast(result.message, "success");
                console.log("Project created successfully:", result);
            } else {
                showToast(result.message, "error");
                console.error("Failed to create project:", response);
            }
        } catch (error) {
            showToast("Error creating project", "error");
            console.error("Error creating project:", error);
        }
    };


    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        handleChange(e);

        if (e.target.files && e.target.files[0]) {
            const fileURL = URL.createObjectURL(e.target.files[0]);
            const updatedImages = [...imagesSample];
            updatedImages[index] = fileURL;
            // setImagesSample({...imagesSample, "":updatedImages[index]});
            setImagesSample(updatedImages);
        }
    };


    console.log(form)

    return (

        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col lg:flex-row gap-16'>

                {/* IMAGES */}
                <div className='w-full lg:w-1/2 lg:sticky top-20 h-max ' >
                    {/* Main Images */}
                    <div className="h-[500px] relative rounded-lg overflow-hidden">
                        {!imagesSample[0] ? (
                            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF
                                    </p>
                                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                        (MAX. 800x400px)
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" name="file1" className="hidden" onChange={(e) => handleImageSelect(e, 0)} />
                            </label>
                        ) : (
                            <label className="relative w-full h-full cursor-pointer rounded-lg ">
                                <div className="h-full w-full relative rounded-lg ">
                                    <Image src={imagesSample[0]} fill alt="Selected Image" className="object-cover" />
                                    {/* Overlay Text */}
                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 bg-gray-900 bg-opacity-50 hover:bg-opacity-20">
                                        <p className="text-sm font-semibold">Click to upload</p>
                                        <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" name="file1" type="file" className="hidden" onChange={(e) => handleImageSelect(e, 0)} />
                                </div>
                            </label>
                        )}
                    </div>
                    {/* Secondary Images */}
                    <div className="flex flex-row justify-between gap-4 mt-16 mb-5">
                        <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden">
                            {!imagesSample[1] ? (
                                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>
                                        </p>
                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF
                                        </p>
                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                            (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" name="file2" className="hidden" onChange={(e) => handleImageSelect(e, 1)} />
                                </label>
                            ) : (
                                <label className="relative w-full h-full cursor-pointer rounded-lg ">
                                    <div className="h-full w-full relative rounded-lg ">
                                        <Image src={imagesSample[1]} fill alt="Selected Image" className="object-cover" />
                                        {/* Overlay Text */}
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 bg-gray-900 bg-opacity-50 hover:bg-opacity-20">
                                            <p className="text-sm font-semibold">Click to upload</p>
                                            <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" name="file2" type="file" className="hidden" onChange={(e) => handleImageSelect(e, 1)} />
                                    </div>
                                </label>
                            )}
                        </div>
                        <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden">
                            {!imagesSample[2] ? (
                                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>
                                        </p>
                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF
                                        </p>
                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                            (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" name="file3" className="hidden" onChange={(e) => handleImageSelect(e, 2)} />
                                </label>
                            ) : (
                                <label className="relative w-full h-full cursor-pointer rounded-lg ">
                                    <div className="h-full w-full relative rounded-lg ">
                                        <Image src={imagesSample[2]} fill alt="Selected Image" className="object-cover" />
                                        {/* Overlay Text */}
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 bg-gray-900 bg-opacity-50 hover:bg-opacity-20">
                                            <p className="text-sm font-semibold">Click to upload</p>
                                            <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" name="file3" type="file" className="hidden" onChange={(e) => handleImageSelect(e, 2)} />
                                    </div>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                {/* TEXT */}
                <div className='w-full lg:w-1/2 flex flex-col gap-6 '>
                    {/* Product Name  */}
                    <div className='bg-white rounded-xl border-[1px] flex flex-col border-gray-200 p-4 gap-3'>
                        <h1 className='text-l font-semibold'>Project Information</h1>
                        <div className='h-[1px] bg-[#D9D9D9]' />
                        <h1 className='text-l text-textGrey '>Project Name</h1>
                        <input type="text" name="project_name" value={form.project_name ? form.project_name : ""} onChange={handleChange} className='text-md rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-inputBgDarkGrey focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Project Name' />
                        {/* Description */}
                        <h1 className='text-l text-grey '>Project Description</h1>
                        <textarea value={form.description ? form.description : ""} name='description' placeholder={product.description} onChange={handleChangeTextArea} rows={5} className='w-full rounded-lg  py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-inputBgDarkGrey focus:outline-none focus:ring-[#cacbcb] focus:shadow' />
                    </div>


                    <div className='bg-slate-100 h-[2px] w-full' />
                    {/* Price and CarbonCredit */}
                    <div className='flex justify-between'>
                        {/* <h2 className='text-2xl font-medium'>${product.prices}</h2> */}
                        <div>
                            <span className='text-2xl font-medium mr-2'>$</span>
                            <input type="number" className='text-2xl px-1 font-medium number-to-text bg-inputBgDarkGrey rounded-md ring-1 ring-[#EFF0F0] focus:outline-none focus:ring-[#cacbcb]' name='price' value={form.price ? form.price : ""} onChange={handleChange} />
                            <MdEdit className='inline-block -translate-x-6 -translate-y-1' />
                        </div>
                        <div className='flex gap-2 justify-center items-center'>
                            <Image src="https://png.pngtree.com/png-vector/20230313/ourmid/pngtree-cartoon-leaf-illustration-vector-png-image_6644591.png" alt="" width={24} height={24} />
                            <h2 className='text-2xl font-medium'>{product.carbon_credit}</h2>
                        </div>
                    </div>
                    <div className='bg-slate-100 h-[2px] w-full' />
                    {/* DATE */}
                    <div className='flex flex-row justify-around gap-4'>
                        {/* Start Date */}
                        <div>
                            <p className='text-center mb-2'>Start Date</p>
                            <div className="relative">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    <path
                                        d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.77614 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <input
                                    type="date"
                                    name="start_date"
                                    onChange={handleChange}
                                    className="h-9 pl-10 pr-4 py-2 w-[240px] bg-white border-gray-300 border-[1px] rounded-lg text-center"
                                    placeholder="Select start Date"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'date'}
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        <div>
                            <p className='text-center mb-2'>End Date</p>
                            <div className="relative">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    <path
                                        d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.77614 7.77614 12 7.5 12C7.22386 12 7 11.77614 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <input
                                    type="date"
                                    name="end_date"
                                    onChange={handleChange}
                                    className="h-9 pl-10 pr-4 py-2 w-[240px] bg-white border-gray-300 border-[1px] rounded-lg text-center"
                                    placeholder="Select End Date"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'date'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Type */}
                    <DropmeDown selectedProjectType={projectType} onSelect={setProjectType} />

                    {/* Certification Information  */}
                    <div className='bg-white rounded-xl border-[1px] flex flex-col border-gray-200 p-4 gap-3 w-full xl:w-max'>
                        <h1 className='text-l font-semibold'>Certification Information</h1>
                        <div className='h-[1px] bg-[#D9D9D9]' />
                        <h1 className='text-l '>Certification Name</h1>
                        <input type="text" name="certification_name" value={form.certification_name ? form.certification_name : ""} onChange={handleChange} className='text-md rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-inputBgDarkGrey focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Certification Name' />
                        <h1 className='text-l '>Certification Agency</h1>
                        <input type="text" name="certification_agency" value={form.certification_agency ? form.certification_agency : ""} onChange={handleChange} className='text-md rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-inputBgDarkGrey focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Certification Agency' />

                        {/* DATE */}
                        <div className='flex flex-row justify-around gap-4'>
                            {/* Issued Date */}
                            <div>
                                <p className='text-center mb-2'>Issued Date</p>
                                <div className="relative">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        <path
                                            d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.77614 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <input
                                        type="date"
                                        name="issued_date"
                                        onChange={handleChange}
                                        className="h-9 pl-10 pr-4 py-2 w-[240px] bg-white border-gray-300 border-[1px] rounded-lg text-center"
                                        placeholder="Select Issued Date"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => e.target.type = 'date'}
                                    />
                                </div>
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <p className='text-center mb-2'>Expiry Date</p>
                                <div className="relative">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        <path
                                            d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.77614 7.77614 12 7.5 12C7.22386 12 7 11.77614 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <input
                                        type="date"
                                        name="expiry_date"
                                        onChange={handleChange}
                                        className="h-9 pl-10 pr-4 py-2 w-[240px] bg-white border-gray-300 border-[1px] rounded-lg text-center"
                                        placeholder="Select Expiry Date"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => e.target.type = 'date'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="rounded-lg ring-1 ring-black p-4 mt-2 mb-2" >
                        Submit
                    </button>
                </div>

            </form>
            <ToastContainer />

        </div >

    )
}

export default AddProduct2 