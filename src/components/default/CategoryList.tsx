import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function CategoryList() {


    const cats = [
        {
            _id: 0,
            slug: "0",
            name: "All-Types",
            bg: "/allCat.jpg"

        }, {
            _id: 1,
            slug: "1",
            name: "Rubber Plantation",
            bg: "/rubberCat.jpg"
        }, {
            _id: 2,
            slug: "2",
            name: "Oil Palm Plantation",
            bg: "/palmCat.jpg"
        }, {
            _id: 3,
            slug: "3",
            name: "Reforestation",
            bg: "/palmCat.jpg"
        }
    ]

    return (
            <div className=" mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap md:gap-8">
                {cats.map((item) => (
                    <Link
                        href={`/list?projectTypeId=${item.slug}`}
                        className=" w-full flex flex-col gap-4 sm:w-[45%] lg:w-[35%]"
                        key={item._id}>
                        <div className="relative bg-slate-100 w-full h-80">
                            <Image
                                src={item.bg}
                                fill
                                sizes="20vw"
                                className="object-cover rounded-lg"
                                alt={""}
                            />
                        </div>
                        <h1 className="mb-2 font-semibold text-center tracking-wide">
                            {item.name}
                        </h1>
                    </Link>
                ))}
            </div>
    );
}
