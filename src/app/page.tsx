"use client";
import Link from "next/link";
import React, { Suspense } from "react";

import Sliders from "@/components/default/Sliders";
import ProductList from "@/components/default/ProductList";
import CategoryList from "@/components/default/CategoryList";
function page({searchParams}: {searchParams: {page :string}}) {

    const page = parseInt(searchParams.page) || 1;
    return (
        <>
            <Sliders />
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <h1 className="text-2xl ">Featured Projects</h1>
                <Suspense fallback={"Loading..."}>
                    <ProductList limit={4} />
                </Suspense>
            </div>
            <div className="mt-24">
                <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12 ">
                    Categories
                </h1>
                <CategoryList />

            </div>
        </>
    );
}

export default page;
