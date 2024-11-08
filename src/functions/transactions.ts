import { getToken } from "./auth";
import type { Project, CreateProjectType } from "../types/type";


// Function to list projects
export const checkout = async (cart_id: number, buyer_name:string) => {
    // const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/checkOut`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({cart_id, buyer_name})
    });

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return res;  // Handle errors and return null
    }

    return res; // Return the JSON response
};

export const getTransaction = async (transaction_id : number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/transaction/${transaction_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return res;  // Handle errors and return null
    }

    return res;
}

export const listTransactions = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/transactions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return res;  // Handle errors and return null
    }

    return res;
}