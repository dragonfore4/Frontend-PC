"use client"

import { useAuth } from '@/contexts/AuthContext';
import { readCarbonCredit } from '@/functions/carboncredit';
import { readCertification } from '@/functions/certifaction';
import { getProjectById, updateProject } from '@/functions/projects';
import { readProjectImages } from '@/functions/project_images';
import { CreateProjectType } from '@/types/type';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'


interface FileOld {
    id: number | undefined,
    image1: string | undefined,
    image2: string | undefined,
    image3: string | undefined,
}

const EditProjectPage = ({ params }: { params: { id: string } }) => {

    const auth = useAuth();

    const [form, setForm] = useState<CreateProjectType>({
        project_name: "",
        price: 200,
        description: "",
        start_date: "2024-09-02",
        end_date: "2025-09-02",
        project_type_id: 1,
        created_by: 1,
        certification_name: "ISO 9001",
        certification_agency: "ISO Organization",
        issued_date: "2024-09-02",
        expiry_date: "2025-09-02",
    });

    const [fileOld, setFileOld] = useState<FileOld>({
        id: undefined,
        image1: undefined,
        image2: undefined,
        image3: undefined,

    });

    const [loading, setLoading] = useState(true)

    // function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    //     const { name, value } = event.currentTarget;
    //     setForm((prevForm) => ({
    //         ...prevForm, [name]: value
    //     }))
    //     // console.log(form)
    // }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        // ตรวจสอบว่าชื่อฟิลด์คือ "file" หรือไม่
        if ((name === 'file1' || name === "file2" || name === "file3") && files && files.length > 0) {
            setForm({
                ...form,
                [name]: files[0],  // อัปเดตฟิลด์ file ด้วยไฟล์ที่ผู้ใช้เลือก
            });
        } else {
            setForm({
                ...form,
                [name]: value,  // อัปเดตฟิลด์ทั่วไปใน form
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (!auth || !auth.user) {
        //     console.error("User is not authenticated.");
        //     return;
        // }

        const formWithImageData = new FormData();
        for (const key in form) {
            // formWithImageData.append(key, form[key])
            const value = form[key as keyof typeof form]
            // console.log(key, form[value])
            if (value instanceof File) {
                formWithImageData.append(key, value)
            } else {
                formWithImageData.append(key, String(value))
            }
        }
        formWithImageData.append("fileOld1", fileOld.image1 as keyof typeof fileOld)
        formWithImageData.append("fileOld2", fileOld.image2 as keyof typeof fileOld)
        formWithImageData.append("fileOld3", fileOld.image3 as keyof typeof fileOld)
        // console.log(formWithImageData)
        // if (!auth || !auth.user) {
        //     console.error("User is not authenticated.");
        //     return;
        // }
        try {

            const response = await updateProject(Number(params.id), formWithImageData);

            if (response && response.ok) {
                const result = await response.json();
                console.log("Project Update successfully:", result);
                // handleListProjectList(); // Refresh list after creation
            } else {
                console.error("Failed to Update project:", response);
            }
        } catch (error) {
            console.error("Error Update project:", error);
        }


    };

    const fetchProject = async (id: number) => {

        // Project
        const response = await getProjectById(id);
        const result = await response?.json();
        result.start_date = result.start_date.split("T")[0]
        result.end_date = result.end_date.split("T")[0]
        setForm(result)

        // Certification
        const response2 = await readCertification(id);
        const result2 = await response2?.json();
        const { certification_id, certification_name, certification_agency } = result2;
        let { issued_date, expiry_date } = result2;
        issued_date = issued_date.split("T")[0];
        expiry_date = expiry_date.split("T")[0];
        setForm((prev) => ({
            ...prev, issued_date, expiry_date, certification_name, certification_agency
        }))

        // Carbon Credit
        const response3 = await readCarbonCredit(id);
        const result3 = await response3?.json();
        // console.log(result3)
        // const { credit_amount } = result3;
        // setForm((prev) => ({
        //     ...prev, credit_amount
        // }))

        // // Projct Images
        // const response4 = await readProjectImages(id);
        // const result4 = await response4?.json();
        // setFileOld(result4)
        setLoading(false)

    }

    useEffect(() => {
        fetchProject(Number(params.id));
    }, [])

    // console.log(form)
    // console.log(fileOld)
    return (!loading ?

        <>
            <h2 className="ml-10 text-2xl ">Form Product</h2>
            <form className="ml-10" onSubmit={handleSubmit} encType="multipart/form-data">
                {[
                    { label: "Project Name", type: "text", name: "project_name", placeholder: "Project Name", value: form.project_name },
                    { label: "Price", type: "number", name: "price", placeholder: "Price", value: form.price },
                    { label: "Description", type: "text", name: "description", placeholder: "Description", value: form.description },
                    { label: "Start Date", type: "date", name: "start_date", placeholder: "Start Date", value: form.start_date },
                    { label: "End Date", type: "date", name: "end_date", placeholder: "End Date", value: form.end_date },
                    { label: "Project Type ID", type: "number", name: "project_type_id", placeholder: "Project Type ID", value: form.project_type_id },
                    { label: "Created By", type: "number", name: "created_by", placeholder: "Created By", value: form.created_by, readOnly: true },
                    { label: "Certification Name", type: "text", name: "certification_name", placeholder: "Certification Name", value: form.certification_name },
                    { label: "Issuing Organization", type: "text", name: "issuing_organization", placeholder: "Issuing Organization", value: form.certification_agency },
                    { label: "Issued Date", type: "date", name: "issued_date", placeholder: "Issued Date", value: form.issued_date },
                    { label: "Expiry Date", type: "date", name: "expiry_date", placeholder: "Expiry Date", value: form.expiry_date },
                    // { label: "Picture1", type: "file", name: "file1", placeholder: ""},
                    // { label: "Picture2", type: "file", name: "file2", placeholder: ""},
                    // { label: "Picture3", type: "file", name: "file3", placeholder: ""},
                ].map(({ label, value, readOnly, ...input }, index) => (
                    <div key={index}>
                        <label>{label}</label>
                        <input className="ring-1 ring-gray-500" onChange={handleChange} {...input} value={value} readOnly={readOnly} />
                        <br />
                    </div>
                ))}
                <label htmlFor="">Picture1</label>
                <input type="file" name='file1' onChange={handleChange} />
                <br />
                <label htmlFor="">Picture2</label>
                <input type="file" name='file2' onChange={handleChange} />
                <br />
                <label htmlFor="">Picture3</label>
                <input type="file" name='file3' onChange={handleChange} />
                <br />
                <div className='flex gap-3'>

                    <Image src={process.env.NEXT_PUBLIC_API_PATH + "/project_imagesByName/" + fileOld.image1} alt='' width={24} height={24} sizes={"100vw"} className='object-cover w-auto h-auto' priority />
                    <Image src={process.env.NEXT_PUBLIC_API_PATH + "/project_imagesByName/" + fileOld.image2} alt='' width={24} height={24} sizes={"100vw"} className='object-cover w-auto h-auto' priority />
                    <Image src={process.env.NEXT_PUBLIC_API_PATH + "/project_imagesByName/" + fileOld.image3} alt='' width={24} height={24} sizes={"100vw"} className='object-cover w-auto h-auto' priority />
                </div>
                <br />
                <button type="submit" className="ring-1 ring-black p-4 mt-2">
                    Submit
                </button>
            </form>
        </> : (<div>ts</div>)


    )
}

export default EditProjectPage