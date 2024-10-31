"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { removeToken } from "@/functions/auth";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

function Navbar() {
    const auth = useAuth();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleLogout = () => {
        removeToken();
        auth?.fetchAuthData();
    };

    useEffect(() => {
        auth?.fetchAuthData();
    }, [auth]);
    // console.log(auth)

    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
            {/* Mobile */}
            <div className=" h-full flex items-center justify-between md:hidden">
                <Link href={"/"}>
                    <div className="text-2xl tracking-wide">CCMarket</div>
                </Link>
                <Menu />
            </div>

            {/* BIGGER SCREENS */}
            <div className="hidden md:flex items-center justify-between gap-8 h-full">
                {/* LEFT */}
                {/* <div className="w-1/3 xl:w-1/2 flex items-center gap-12"> */}
                <div className="w-1/3 xl:w-max flex items-center gap-12">

                    <Link href="/" className="flex items-center gap-3">
                        {/* <Image src="/logo.png" alt="" width={24} height={24} /> */}
                        <Image src="https://png.pngtree.com/png-vector/20230313/ourmid/pngtree-cartoon-leaf-illustration-vector-png-image_6644591.png" alt="" width={24} height={24} className=""/>
                        <div className=" text-2xl tracking-wide text-blacks">CCMarket</div>
                    </Link>

                    <div className="hidden xl:flex flex-grow gap-4">
                        <Link href="/" className={`${currentPage == 0 ? "underline" : ""}`} onClick={() => setCurrentPage(0)}>Homepage</Link>
                        <Link href="/list" className={`${currentPage == 1 ? "underline" : ""}`} onClick={() => setCurrentPage(1)}>Shop</Link>
                        <Link href="/" className={`${currentPage == 2 ? "underline" : ""}`} onClick={() => setCurrentPage(2)}>About</Link>
                        {
                            auth?.user != null && (
                                <Link href="/addproduct" className={`${currentPage == 3 ? "underline" : ""}`} onClick={() => setCurrentPage(3)}>Add Project</Link>
                            )
                        }
                        {auth?.user == "admin" ? (
                            <Link href="/admin" className={`${currentPage == 4 ? "underline" : ""}`} onClick={() => setCurrentPage(4)}>admin</Link>
                        )
                            : (null)
                        }
                    </div>
                </div>
                {/* RIGHT */}
                {/* <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8"> */}
                <div className="w-2/3 flex flex-1  items-center justify-between gap-8">
                    <SearchBar />
                    <NavIcons />
                </div>
            </div>
        </div >
    );
}

export default Navbar;
