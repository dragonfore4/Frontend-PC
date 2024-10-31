import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import { config } from "process";
import type { userDataType } from "@/types/type";
import type { DecodedToken } from "@/types/type";

export const getToken = (): string | null => {
        try {
            // const token: string | null = sessionStorage.getItem("token");
            const token: string | undefined = cookies.get("token");
            console.log("in auth",token)
            // console.log("token: ",token)
            if (!token) {
                console.log("From auth.ts getToken() Login First!.");
                return null;
            }
            return token;
        } catch (err) {
            console.log(err);
            return null;
        }
    };
    

export const decodeToken = (token: string | null): DecodedToken | null => {
    try {
        if (!token) {
            console.log("No token provided for decoding, Login first!.");
            return null;
        }
        // console.log("indecode token: ",token)
        return jwtDecode<DecodedToken>(token);
    } catch (err) {
        console.error("From Decode token: ", err);
        return null;
    }
};

export const removeToken = () => {
    const token = cookies.get("token");
    if (token) {
        cookies.remove("token");
        console.log("delete token succesful");
    } else {
        console.log("dont have this token name");
    }
};

export const login = async (userData: userDataType) => {

    console.log("hello")
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
    });

    // if (!res.ok) {
        // console.error("Failed to fetch user login", res.statusText)
        // return res
    // }
    return res;
};


export const register = async (userData: userDataType) => {

    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    // if (!res.ok) {
        // console.error("Failed to fetch user login", res.statusText)
        // return res
    // }
    return res;
};

export const getUserIdByUsername = async (username: string) => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/getUserIdByUsername", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username })
    });

    // if (!res.ok) {
    //     console.error("Failed to fetch", res.statusText);
    // }

    return res;
}
