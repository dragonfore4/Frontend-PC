"use client";

import React, { useEffect, useState, } from "react";
import cookies from "js-cookie";
import { useRouter} from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { login } from "../Functions/auth";

export interface userDataType {
  username: string;
  password: string;
}

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const userData: userDataType = { username, password };

    // console.log(username, password);
    if (!username || !password) {
      window.alert("input all");
      return;
    } else {
      try {
        const response = await login(userData);
        if (response !== null && response.ok) {
          const result = await response.json();
          cookies.set("token", result.token, { expires: 1 / 48 }); // 30 mins
          console.log("set token already");
          window.location.reload();
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {/* <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-slate-100 "> */}
      <div className="flex justify-center items-center h-[calc(100vh-80px)] ">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md mx-10 ring-1 ring-gray-300">
          <h1 className="text-center font-bold text-2xl pb-1 border-b-2">Login</h1>
          <div className="flex flex-col pt-2 gap-4 tracking-wide">
            <div className="mt-2">
              <Label className="pl-1 ">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="username"
                className="text-sm ring-gray-300 ring-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label className={"pl-1"}>Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="password"
                className="ring-gray-300 ring-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-row justify-between items-center translate-y-1 gap-2">
              <Button onClick={handleSubmit} className="grow">Login</Button>
              <span className="text-gray-400 text-sm">forgot password?</span>
            </div> */}
            <div className="flex flex-row justify-between items-center translate-y-1 gap-2">
              <span className="text-gray-400 text-sm hover:text-gray-700">Forgot password?</span>
              <span className="text-gray-400 text-sm hover:text-gray-700">Don&apos;t have an <span className="text-blue-300 hover:text-blue-500 hover:underline" onClick={() => router.push("/register")}>acoount?</span></span>
              
            </div>

              <Button onClick={handleSubmit} className="grow">Login</Button>
          </div>
        </div>
      </div>
      dsf
    </>
  );
}

export default LoginPage;
