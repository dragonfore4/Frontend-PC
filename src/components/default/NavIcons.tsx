"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import CartModal from "./CartModal";
import { useAuth } from "../../contexts/AuthContext";
import { removeToken } from "@/functions/auth";
import CartModal from "./CartModal";

export default function NavIcons() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const auth = useAuth();
    const router = useRouter();

    //   Temporary
    const isLoggedIn = false;

    const handleProfile = () => {
        // if (!isLoggedIn) {
        //   router.push("/login");
        // }
        setIsProfileOpen((prev) => !prev);
        // console.log(auth?.token);
    };

    const handleLogout = () => {
        removeToken();
        auth?.fetchAuthData();
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative ">

            <Image
                src="/profile.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer "
                onClick={handleProfile}
            />

            {isProfileOpen && !auth?.token && (

                <div className="absolute flex flex-col p-4 rounded-md top-12 left-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
                    <Link href={"/login"} className="text-center">
                        Login
                    </Link>
                    <Link href={"/register"} className="text-center">
                        Register
                    </Link>
                </div>
            )}
            {isProfileOpen && auth?.token && (
                <div className="absolute flex flex-col  p-4 rounded-md top-12 left-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20  bg-white">
                    <Link href={"/profile"} className="text-center">
                        Profile
                    </Link>
                    <div
                        className="text-center cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </div>
                </div>
            )}

            {
                auth && auth.user && (
                    <div className="flex gap-6">

                        <Image
                            src="/notification.png"
                            alt=""
                            width={22}
                            height={22}
                            className="cursor-pointer"
                        />
                        <div className="relative cursor-pointer">
                            <Image
                                src="/cart.png"
                                alt=""
                                width={22}
                                height={22}
                                className="cursor-pointer"
                                onClick={() => setIsCartOpen((prev) => !prev)}
                            />
                            {/* <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-300 rounded-full text-white text-sm flex items-center justify-center"> */}
                            {/* 1 */}
                            {/* </div> */}
                            {isCartOpen && <CartModal />}
                        </div>
                    </div>
                )}
        </div>
    );




}

