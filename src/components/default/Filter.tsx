"use client"
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function Filter() {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const router = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        // replace(`${pathname}?${params}`,
        //     {
        //         scroll: false
        //     }
        // )
        console.log(`${pathname}?${params}`)
        router.push(`${pathname}?${params}`, { scroll: false })
    
    }

    return (
        <div className="mt-12 flex justify-between">
            <div className="flex gap-6 flex-wrap">
                <select
                    name="projectTypeId"
                    id=""
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                    onChange={handleFilterChange}
                >
                    <option value="0">All Project-Type</option>
                    <option value="1">Rubber Plantation</option>
                    <option value="2">Oil Palm Plantation</option>
                    <option value="3">Reforestation</option>
                </select>
                <input
                    type="text"
                    name="min"
                    placeholder="min price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="max"
                    placeholder="max price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />

            </div>
            <div>
                <select
                    name="type"
                    id=""
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option>Sort By</option>
                    <option value="Physical">Price (low to high)</option>
                    <option value="Digital">Price (high to low)</option>
                    <option value="Digital">Newst</option>
                    <option value="Digital">Oldes</option>

                </select>

            </div>
        </div>
    );
}

export default Filter;