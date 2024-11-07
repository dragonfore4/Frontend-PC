import { getToken } from "./auth";
import type { Project, CreateProjectType } from "../types/type";

export const createProject = async (form: FormData) => {
    const token = await getToken();
    if (!token) {
        console.log("No token found. Please login first.");
        return null;  // Return null if there's no token
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects`, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${token}`,
            // ไม่ต้องใส่ "Content-Type" เพราะ browser จะกำหนด "multipart/form-data" ให้อัตโนมัติเมื่อใช้ FormData
        },
        body: form  // ส่งข้อมูลในรูปแบบ FormData
    });

    return res;
};

// Function to read a project by ID
export const getProjectById = async (id: number) => {
    // const token = getToken();
    // if (!token) {
    //     console.log("No token found. Please login first.");
    //     return null;  // Return null if there's no token
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        console.error(`Failed to fetch project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }

    return res;  // Return the JSON response
};

// Function to list projects
export const listProjects = async () => {

    // const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return res;  // Handle errors and return null
    }

    return res; // Return the JSON response
};

// Function to list projects
export const listAllProjectDetails = async (limit: number, projectTypeId?: string, min?: number, max?: number) => {
    // console.log("e",projectTypeId)

    let query = `?limit=${String(limit)}`;
    if (projectTypeId) {
        query += `&projectTypeId=${projectTypeId}`
    }

    if (min !== undefined) {
        query += `&minPrice=${min}`
    }
    if (max !== undefined) {
        query += `&maxPrice=${max}`
    }

    console.log(query)
    // const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/details/all${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch projects:", res.statusText);
        return res;  // Handle errors and return null
    }

    return res; // Return the JSON response
};

// Function to read a project by ID
export const getAllProjectDetails = async (id: number) => {
    // const token = getToken();
    // if (!token) {
    //     console.log("No token found. Please login first.");
    //     return null;  // Return null if there's no token
    // }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/details/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    // Log the raw response
    // const textResponse = await res.text();
    // console.log("Raw API Response: ", textResponse);
    if (!res.ok) {
        console.error(`Failed to fetch project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }


    return res;  // Return the JSON response
};

export const updateProject = async (id: number, form: FormData) => {
    const token =await getToken();
    if (!token) {
        console.log("No token found. Please login first.");
        return null;  // Return null if there's no token
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}`, {
        method: "PUT",
        headers: {
            "authorization": `Bearer ${token}`
        },
        body: form
    });

    if (!res.ok) {
        console.error(`Failed to update project ${id}:`, res.statusText);
        return null;  // Handle errors and return null
    }

    return res;  // Return the JSON response
}

export const updateProjectStatus = async (id: number, status: number) => {
    const token = await getToken();
    if (!token) {
        console.error("No token found. Please login first.");
        return null;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status_id: status }),
    });

    if (!res.ok) {
        console.error("Failed to update project status:", res.statusText);
        return null;
    }

    return await res.json();
};

// Function to delete a project
export const deleteProject = async (id: number) => {
    const token =await getToken();
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





export const getTop5 = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/`)
}



