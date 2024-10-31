"use client";

import React, { useState, ChangeEvent } from 'react';
import Image from "next/image";
import { useParams, usePathname } from 'next/navigation';
import { addProjectToCart, getCartIdByUsername } from '@/functions/carts';
import { useAuth } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { showToast } from '@/utils/toastUtils';

interface ImagesType {
    images?: {
        image1: string,
        image2: string,
        image3: string,
    }
}

const ProductImages = (Images: ImagesType) => {

    const auth = useAuth();
    
    
    const params = useParams();
    const { slug } = params;
    const project_Id = Number(slug)
    console.log(slug)
    const [images, setImages] = useState<string[]>([]);

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const fileURL = URL.createObjectURL(e.target.files[0]);
            const updatedImages = [...images];
            updatedImages[index] = fileURL;
            setImages(updatedImages);
        }
    };

    const handleAddToCart = async (project_Id: number) => {
        // console.log("Hello")
        console.log( auth)
        if (auth && !auth.user) {
            showToast("Login First","error")
            return;
        }
        if (auth && auth.user) {
            const cart_id = await getCartIdByUsername(auth.user);
            if (!cart_id) {
                console.error("CART ID NOT FOUND")
                showToast("CART ID NOT FOUND","error")
            return;
                return;
            }
            try {
                const response = await addProjectToCart(cart_id, project_Id)
                if (response.ok) {
                showToast("Project added to cart successfully!","success")
                } else {
                    console.error("Failed to add project to cart");
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const renderTemplate = (index: number) => (
        !images[index] ? (
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleImageSelect(e, index)} />
            </label>
        ) : (
            // Display the selected image when one is chosen
            <label className="relative w-full h-full cursor-pointer rounded-lg ">
                <div className="h-full w-full relative rounded-lg ">
                    <Image src={images[index]} fill alt="Selected Image" className="object-cover" />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 bg-gray-900 bg-opacity-50 hover:bg-opacity-20">
                        <p className="text-sm font-semibold">Click to upload</p>
                        <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" name="picture1" type="file" className="hidden" onChange={(e) => handleImageSelect(e, 0)} />
                </div>
            </label>
        )
    );

    if (images) {
        return (
            <div>
                {/* Main Image */}
                <div className="h-[500px] relative rounded-lg overflow-hidden">
                    <div className="h-full w-full relative rounded-lg ">
                        <Image src={process.env.NEXT_PUBLIC_API_PATH + `/project_imagesByName/${Images.images?.image1}`} fill alt="Selected Image" className="object-cover" />
                    </div>
                </div>
                {/* Secondary Images */}
                <div className="flex flex-row justify-between gap-4 mt-16 mb-5">
                    <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden relative">
                        <Image src={process.env.NEXT_PUBLIC_API_PATH + `/project_imagesByName/${Images.images?.image2}`} fill alt="Selected Image" className="object-cover" />
                    </div>
                    <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden relative">
                        <Image src={process.env.NEXT_PUBLIC_API_PATH + `/project_imagesByName/${Images.images?.image3}`} fill alt="Selected Image" className="object-cover" />
                    </div>
                </div>
                <button className=" text-md font-semibold ring-2 shadow-lg ring-green-400 rounded-2xl px-4 py-2 w-full hover:bg-green-400 hover:text-white mb-3" onClick={() => handleAddToCart(project_Id)}>Add To Cart</button>
                <ToastContainer/>

            </div>
        )
    }

    return (
        <div>
            {/* Main Image */}
            <div className="h-[500px] relative rounded-lg overflow-hidden">
                {renderTemplate(0)}
            </div>
            {/* Secondary Images */}
            <div className="flex flex-row justify-between gap-4 mt-16 mb-5">
                <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden">
                    {renderTemplate(1)}
                </div>
                <div className="w-1/4 lg:w-2/4 h-32 rounded-lg overflow-hidden">
                    {renderTemplate(2)}
                </div>
            </div>
        </div>
    );
};

export default ProductImages;
