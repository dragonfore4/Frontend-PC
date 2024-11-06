"use client";

import React, { useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/functions/auth";
import { userDataType } from "@/types/type";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { showToast } from "@/utils/toastUtils";

function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async () => {
        const userData: userDataType = { username, password };

        // Validation
        if (!username || !password) {
            showToast("You have to fill all the data!", "warn");
            return;
        }

        try {
            const response = await login(userData);

            if (response && response.ok) {
                const result = await response.json();
                // cookies.set("token", result.token, { expires: 8 / 48 }); // 60 mins
                showToast(result.message || "Login successful!", "success");

                // Redirect after 3 seconds
                // setTimeout(() => {
                //     // window.location.href = "/"; // Use Next.js's router for redirection
                // }, 3000);
            } else {
                const result = await response.json();
                showToast(result.message || "Login failed", "error");
            }
        } catch (err) {
            showToast("An error occurred during login. Please try again.", "error");
            console.error("Error: ", err);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-[calc(100vh-80px)]">
                <div className="w-96 p-6 shadow-lg bg-white rounded-xl mx-10 ring-1 ring-gray-300">
                    <h1 className="text-center font-bold text-2xl pb-1 border-b-2">Login</h1>
                    <div className="flex flex-col pt-2 gap-4 tracking-wide">
                        <div className="mt-2">
                            <Label className="pl-1">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="username"
                                className="text-sm mt-1 ring-gray-300 ring-1 rounded-md focus:bg-[#E9EDE9] placeholder:text-gray-500"
                                value={username}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="pl-1">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="password"
                                className="text-sm mt-1 ring-gray-300 ring-1 focus:bg-[#E9EDE9] placeholder:text-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center translate-y-1 gap-2">
                            <span className="text-gray-400 text-sm hover:text-gray-700">Forgot password?</span>
                            <span className="text-gray-400 text-sm hover:text-gray-700">
                                Don&apos;t have an <span className="text-blue-300 hover:text-blue-500 hover:underline" onClick={() => router.push("/register")}>account?</span>
                            </span>
                        </div>
                        <Button onClick={handleSubmit} className="grow hover:bg-slate-200 ring-1 ring-black">Login</Button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default LoginPage;