import { getToken } from "./auth";

export const readProjectImages =  async (id : number) => {
    const token = await getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/project_images/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        console.error("Failed to fetch project_imaegs: ", res.statusText);
        return res;
    }
    return res;
}

export const listProjectImages = async () => {
    // const token =await getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/project_images",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        console.error("Failed to fetch project: ", res.statusText);
        return res;
    }
    return res;
}
