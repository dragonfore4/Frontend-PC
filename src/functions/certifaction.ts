import { getToken } from "./auth"

export const listCertifaction = async () => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/certification",
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

export const readCertification = async (id : number) => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/certification/${id}`,
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