import { jwtDecode } from "jwt-decode";
import { config } from "process";
import type { userDataType } from "@/types/type";
import type { DecodedToken } from "@/types/type";

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
    const token = await getToken();
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
export const getToken = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/getToken`, {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
            const data = await response.json();
            return data.token; // Assuming the backend returns `{ token: "your-token" }`
        } else {
            // console.error("Failed to fetch token:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};


export const decodeToken = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/decodeToken", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
            console.error("Failed to fetch token:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data; // Assuming the backend returns `{ token: "your-token" }`
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};

export const deleteToken = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/deleteToken", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
            console.error("Failed to fetch token:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data; // Assuming the backend returns `{ token: "your-token" }`
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};
