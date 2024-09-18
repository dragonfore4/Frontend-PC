"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import CartModal from "./CartModal";
import { useAuth } from "../Contexts/authContext";
import { removeToken } from "../Functions/auth";

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
  };

  const handleLogout = () => {
    removeToken();
    auth?.fetchAuthData();
  };

  console.log(auth);
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative 0">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {/* {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href={"/"}>Profiles</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )} */}
      {isProfileOpen && !auth?.token && (
        <div className=" absolute flex flex-col  p-4 rounded-md top-12 left-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 bg-white">
          <Link href={"/login"} className="text-center" onClick={() => console.log("clock")}>
            Login 
          </Link>
          <Link href={"/register"} className="text-center">
            Register
          </Link>
        </div>
      )}
      {isProfileOpen && auth?.token && (
        <div className=" absolute flex flex-col  p-4 rounded-md top-12 left-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 bg-white">
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
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-300 rounded-full text-white text-sm flex items-center justify-center">
          1
        </div>
      </div>
      {/* {isCartOpen && <CartModal />} */}
    </div>
  );
}
