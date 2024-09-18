"use client";
import Link from "next/link";
import React from "react";
import Sliders from "./Components/Sliders";
import NewArrivals from "./Components/NewArrivals";
import NewArrivals2 from "./Components/NewArrivals";
function page() {
  return (
    <>
      <Sliders />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-2xl ">Ours Projects</h1>
          <h3 className="text-md hover:text-green-500">View All</h3>
        </div>
        <NewArrivals />
      </div>
        {/* <NewArrivals2 /> */}
    </>
  );
}

export default page;
