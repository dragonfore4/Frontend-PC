import { getToken } from "./auth";

// Function to list projects
export const list = async () => {


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "authorization": `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return null;  // Handle errors and return null
    }

    return res; // Return the JSON response
};

// Function to delete a project
export const remove = async (id: number) => {
    const token = getToken();
    if (!token) {
        console.log("No token found. Please login first.");
        return null;  // Return null if there's no token
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        console.error(`Failed to delete project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }

    return res;  // Return the JSON response
};

// Function to read a project by ID
export const read = async (id: number) => {
    const token = getToken();
    if (!token) {
        console.log("No token found. Please login first.");
        return null;  // Return null if there's no token
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        console.error(`Failed to fetch project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }

    return res;  // Return the JSON response
};

// Function to update a project by ID
export const update = async (id: number, data: string) => {
    const token = getToken();
    if (!token) {
        console.log("No token found. Please login first.");
        return null;  // Return null if there's no token
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        console.error(`Failed to update project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }

    return res;  // Return the JSON response
};

export const getTop5 = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/`)
}


