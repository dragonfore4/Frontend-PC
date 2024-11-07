"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/type";

interface ProductList2Props {
    ProjectsData: Project[];
}

const ProductList2 = ({ ProjectsData }: ProductList2Props) => {
    const [projects, setProjects] = useState<Project[]>([]);

    // Set projects when ProjectsData changes
    useEffect(() => {
        setProjects(ProjectsData);
    }, [ProjectsData]);

    return (
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <Link
                        href={`project/${project.project_id}`}
                        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                        key={project.project_id}
                    >
                        <div className="relative h-80 w-full rounded-xl">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_PATH}/project_imagesByName/${project.image1}`}
                                alt={project.project_name || "Project Image"}
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-xl"
                            />
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_PATH}/project_imagesByName/${project.image2}`}
                                alt={project.project_name || "Project Image"}
                                fill
                                sizes="25vw"
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
                        <button className="text-xs ring-1 ring-green-400 rounded-2xl px-4 py-2 w-max hover:bg-green-400 hover:text-white">
                            View Project
                        </button>
                    </Link>
                ))
            ) : (
                <p>No projects match with conditions.</p>
            )}
        </div>
    );
};

export default ProductList2;
