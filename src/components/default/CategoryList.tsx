import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function CategoryList() {


    const cats = [
        {
            _id: 0,
            slug: "0",
            name: "all-projects",
            bg: "/allCat.jpg"

        }, {
            _id: 1,
            slug: "1",
            name: "Forestation",
            bg: "/orangeCat.jpg"
        }, {
            _id: 2,
            slug: "2",
            name: "Renewabel Energy",
            bg: "/PalmCat.jpg"
        },
    ]

    return (
        <div className="px-4 overflow-x-hidden">
            {/* // <div className=" px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative"> */}
            <div className=" flex gap-4 md:gap-8">
                {cats.map((item) => (

                    <Link
                        href={`/list?projectTypeId=${item.slug}`}
                        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
                        key={item._id}>
                        <div className="relative bg-slate-100 w-full h-96">
                            <Image
                                src={item.bg}
                                fill
                                sizes="20vw"
                                className="object-cover "
                                alt={""}
                            />
                        </div>
                        <h1 className="mt-8 mb-2 font-light text-center tracking-wide">
                            {item.name}
                        </h1>
                    </Link>
                ))}
            </div>
        </div>
    );
}
