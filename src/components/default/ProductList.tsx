"use client";

import React, { useEffect, useState } from "react";
import { listAllProjectDetails} from "@/functions/projects";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/type";

const PRODUCT_PER_PAGE = 20;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductList = ({ limit, projectTypeId, min, max }: { projectTypeId?: string, limit?: number, min?: number, max?: number}) => {

    const [projects, setProjects] = useState<Project[]>([]); // Initialize as an empty array

    // console.log(min)
    const getProducts = async () => {
        if (projectTypeId === "0") {
            projectTypeId = ""
        }
        // const res = await listAllProjectDetails(limit ? limit : PRODUCT_PER_PAGE, projectTypeId, min, max);
        const res = await listAllProjectDetails(PRODUCT_PER_PAGE, projectTypeId, min, max);
        if (!res.ok) {
            return
        }
        const result = await res.json();
        const data = result.filter((r:Project) => r.status_id == 2).slice(0, limit);
        setProjects(data); // Set the fetched projects
    };

    useEffect(() => {
        getProducts(); // Fetch projects when component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit,projectTypeId, min, max]); // The limit as a dependency in case it changes

    // console.log(limit, projects)    

    return (
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap ">
            {projects && projects.map((project) => (
                <Link
                    href={`project/${project.project_id}`}
                    className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    key={project.project_id}
                >
                    <div className="relative h-80 w-full rounded-xl">
                        <Image
                            src={process.env.NEXT_PUBLIC_API_PATH + "/project_imagesByName/" + project.image1}
                            alt={project.project_name || "Project Image"}
                            fill
                            sizes={"25vw"}
                            className="absolute object-cover rounded-xl"
                        />
                        <Image
                            src={process.env.NEXT_PUBLIC_API_PATH + "/project_imagesByName/" + project.image2}
                            alt={project.project_name || "Project Image"}
                            fill
                            sizes={"25vw"}
                            className="absolute object-cover rounded-xl z-10 hover:opacity-0 duration-1000 transition-opacity ease-in-out"
                        />
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">{project.project_name || "Unnamed Project"}</span>
                        <span className="font-semibold">{project.price}$</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        {project.description.length > 60 ? project.description.slice(0, 60) + "..." : project.description}

                    </div>
                    <button className="text-xs ring-1 ring-green-400 rounded-2xl px-4 py-2 w-max hover:bg-green-400 hover:text-white">View Project</button>
                </Link>
            ))}

            
        </div>
    );
};

export default ProductList;
