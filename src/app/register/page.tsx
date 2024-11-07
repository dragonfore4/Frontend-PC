"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userDataType } from "@/types/type";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/utils/toastUtils"; // Custom toast function
import { register } from "@/functions/auth"; // Your registration function

function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!username || !password || !confirmPassword || !email) {
      showToast("Please fill in all the fields!", "warn");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "warn");
      return;
    }

    const userData: userDataType = { username, password, email };

    try {
      const response = await register(userData);
      const result = await response.json();

      if (response.ok) {
        showToast(result.message || "Registration successful!", "success");

        // Redirect to login after a delay
        // setTimeout(() => {
        //   router.push("/login");
        // }, 3000);
      } else {
        showToast(result.message || "Registration failed!", "error");
      }
    } catch (err) {
      showToast("An error occurred during registration.", "error");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="w-96 p-6 shadow-lg bg-white rounded-xl ring-1 ring-gray-300">
          <h1 className="text-center font-bold text-2xl pb-1 border-b-2">Register</h1>
          <div className="flex flex-col pt-2 gap-4 tracking-wide">
            <div className="mt-2">
              <Label className="pl-1">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="Email"
                className="mt-1 ring-gray-300 ring-1 focus:bg-[#E9EDE9] placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label className="pl-1">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="username"
                className="mt-1 ring-gray-300 ring-1 focus:bg-[#E9EDE9] placeholder:text-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label className="pl-1">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="password"
                className="mt-1 ring-gray-300 ring-1 focus:bg-[#E9EDE9] placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="pl-1">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="mt-1 ring-gray-300 ring-1 focus:bg-[#E9EDE9] placeholder:text-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <span className="text-gray-400 text-sm hover:text-gray-700">
              Already have an{" "}
              <span
                className="text-blue-300 hover:text-blue-500 hover:underline"
                onClick={() => router.push("/login")}
              >
                account?
              </span>
            </span>
            <div className="flex justify-center items-center translate-y-1">
              <Button onClick={handleSubmit} className="  grow hover:bg-slate-200 ring-1 ring-black">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
