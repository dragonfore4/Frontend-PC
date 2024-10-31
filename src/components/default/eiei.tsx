"use client"

import { DatePicker } from '@/components/default/DatePicker'
import ProductImages from '@/components/default/ProductImages'
import { Calendar } from '@/components/ui/calendar'
import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { ProjectTypeSelect } from '@/components/default/ProjectTypeSelect'
import DropmeDown from '@/components/default/DropmeDown'
import { useAuth } from '@/contexts/AuthContext'
import { getUserIdByUsername } from '@/functions/auth'
import { showToast } from '@/utils/toastUtils'
import { MdEdit } from "react-icons/md";
import { CreateProjectType } from '@/types/type'


const EieiPage = () => {
    const auth = useAuth();
    const [form, setForm] = useState<CreateProjectType>({
        project_name: "",
        price: undefined,
        description: "",
        start_date: "",
        end_date: "",
        project_type_id: 0,
        created_by: 0,
        certification_name: "",
        certification_agency: "",
        issued_date: "",
        expiry_date: "",
        file1: undefined,
        file2: undefined,
        file3: undefined,
    });

    const [projectType, setProjectType] = useState<number | undefined>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [images, setImages] = useState<string[]>([]); // To manage image selection in ProductImages

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
        setForm((prevForm) => ({
            ...prevForm,
            start_date: startDate ? startDate : undefined,
            end_date: endDate ? endDate : undefined,
            project_type_id: projectType || 1,
        }));
    }, [startDate, endDate, projectType]);

    console.log(form)

    const product = {
        product_name: "Product Name",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas, fuga vel aspernatur reiciendis suscipit incidunt nostrum nobis. Debitis, id?",
        prices: 45,
        startDate: "",
        endDate: "",
        project_type: 1,
        carbon_credit: 440
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.')
    }

    console.log(form)
    // console.log(endDate ? new Date(endDate).toISOString().split('T')[0] : 'No end date selected');

    return (

        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col lg:flex-row gap-16'>

                {/* IMAGES */}
                <div className='w-full lg:w-1/2 lg:sticky top-20 h-max ' >
                    <ProductImages />
                </div>
                {/* TEXT */}
                <div className='w-full lg:w-1/2 flex flex-col gap-6 '>
                    {/* Product Name  */}
                    <div className='bg-white rounded-xl border-[1px] flex flex-col border-gray-200 p-4 gap-3'>
                        <h1 className='text-l font-semibold'>Project Information</h1>
                        <div className='h-[1px] bg-[#D9D9D9]' />
                        <h1 className='text-l '>Project Name</h1>
                        <input type="text" name="project_name" value={form.project_name} onChange={handleChange} className='text-lg rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-white focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Project Name' />
                        {/* Description */}
                        <h1 className='text-l '>Project Description</h1>
                        <textarea value={form.description} name='description' placeholder={product.description} onChange={handleChangeTextArea} rows={5} className='w-full rounded-lg  py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-white focus:outline-none focus:ring-[#cacbcb] focus:shadow' />
                    </div>


                    <div className='bg-slate-100 h-[2px] w-full' />
                    {/* Price and CarbonCredit */}
                    <div className='flex justify-between'>
                        {/* <h2 className='text-2xl font-medium'>${product.prices}</h2> */}
                        <div>
                            <span className='text-2xl font-medium mr-2'>$</span>
                            <input type="number" className='text-2xl px-1 font-medium number-to-text bg-inputBg rounded-md ring-1 ring-[#EFF0F0] focus:outline-none focus:ring-[#cacbcb]' name='price' value={form.price} onChange={handleChange} />
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
                        {/* <Calendar/> */}
                        <div>
                            <p className='text-center mb-2'>Start Date</p>
                            <DatePicker text='Pick Start Date' selectedDate={product.startDate} onDateChange={setStartDate} />
                        </div>
                        <div>
                            <p className='text-center mb-2'>End Date</p>
                            <DatePicker text='Pick End Date' selectedDate={product.endDate} onDateChange={setEndDate} />
                        </div>
                    </div>
                    {/* Project Type */}
                    <DropmeDown selectedProjectType={projectType} onSelect={setProjectType} />

                    {/* Certification INformation  */}
                    <div className='bg-white rounded-xl border-[1px] flex flex-col border-gray-200 p-4 gap-3'>
                        <h1 className='text-l font-semibold'>Certification Information</h1>
                        <div className='h-[1px] bg-[#D9D9D9]' />
                        <h1 className='text-l '>Certification Name</h1>
                        <input type="text" name="certification_name" value={form.certification_name} onChange={handleChange} className='text-lg rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-white focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Certification Name' />
                        <h1 className='text-l '>Certification Agency</h1>
                        <input type="text" name="certification_agency" value={form.certification_agency} onChange={handleChange} className='text-lg rounded-lg py-2 px-3 ring-[#EFF0F0] ring-[1px] bg-white focus:outline-none focus:ring-[#cacbcb] focus:shadow' placeholder='Certification Agency' />

                        <div className='flex flex-row justify-around gap-4'>
                            {/* Start Date */}
                            <div>
                                <p className='text-center mb-2'>Issued Date</p>
                                <DatePicker text='Pick Issued Date' selectedDate={product.startDate} onDateChange={setStartDate} />
                            </div>
                            <div>
                                <p className='text-center mb-2'>Expired Date</p>
                                <DatePicker text='Pick Expired Date' selectedDate={product.endDate} onDateChange={setEndDate} />
                            </div>
                        </div>
                    </div>

                </div>
            </form>

        </div >

    )
}

export default EieiPage