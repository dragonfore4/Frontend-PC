"use client";

import React, { useEffect, useState } from "react";
import { list } from "../Functions/project";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "../Types/type";
import { Divide } from "lucide-react";

function NewArrivals2() {
  const [newArrivals, setNewArrivals] = useState<Project[]>([]);

  const loadNewArrivals = async () => {
    try {
      const response = await list();
      if (response !== null && response.ok) {
        const result = await response.json();
        let arrivals = result;
        arrivals = arrivals.slice(-4); // Get last 5 items
        setNewArrivals(arrivals); // Update state with last 5 items
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNewArrivals();
  }, []);
  console.log(newArrivals);

  return (
    <></>
    // <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap ">
    //   {newArrivals.map((newArrival, index) => (
    //     <Link
    //       key={newArrival.project_id}
    //       href={"/"}
    //       className=" w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] "
    //     >
    //       <div className=" relative w-full h-80">
    //         <Image
    //           className="absolute object-cover rounded-md "
    //           src={
    //             "https://images.pexels.com/photos/28110792/pexels-photo-28110792.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=loadunded-md"
    //           }
    //           alt={""}
    //           fill
    //         />
    //         <Image
    //           className="absolute object-cover rounded-md hover:opacity-0 transition-all ease-in-out duration-500"
    //           src={
    //             "https://images.pexels.com/photos/27913669/pexels-photo-27913669.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //           }
    //           alt={""}
    //           fill
    //         />
    //       </div>

    //       <div>
    //         {newArrival.project_id}
    //         <hr />
    //         {newArrival.created_at}
    //       </div>
    //     </Link>
    //   ))}
    // </div>
  );
}

export default NewArrivals2;
