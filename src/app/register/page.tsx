"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


interface UserDataType {
  username: string;
  password: string;
  email: string;
}

function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      password != confirmPassword
    ) {
      alert("sometin worg");
      return;
    }
    const userData: UserDataType = { username, password, email };
    // console.log(userData)

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_PATH + "/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (<>
    <div className="flex justify-center items-center h-[calc(100vh-80px)] ">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md ring-1 ring-gray-300">
        <h1 className="text-center font-bold text-2xl pb-1 border-b-2">
          Register
        </h1>
        <div className="flex flex-col pt-2 gap-4 tracking-wide">
          <div className="mt-2">
            <Label className={"pl-1"}>Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Email"
              className="ring-gray-300 ring-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div>
            <Label className="pl-1 ">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="username"
              className="text-sm  ring-gray-300 ring-1"
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
          <div>
            <Label className={"pl-1"}>Confirm Password</Label>
            <Input
              type="password"
              id="Confirm password"
              placeholder="Confirm Password"
              className="ring-gray-300 ring-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </div>
              <span className="text-gray-400 text-sm hover:text-gray-700">Already have an <span className="text-blue-300 hover:text-blue-500 hover:underline" onClick={() => router.push("/login")}>acoount?</span></span>
          <div className="flex justify-center items-center translate-y-1">
            <Button onClick={handleSubmit} className="grow">
              Register
            </Button>
          </div>
          {/* <span></span> */}
        </div>
      </div>
    </div>
      dsf
              </>
  );
}

export default RegisterPage;
