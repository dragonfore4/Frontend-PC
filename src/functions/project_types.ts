import { getToken } from "./auth"

export const listProjectsTypes = async () => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/project_types",
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

export const readProjectType = async (id : number) => {
    // const token =await getToken();
    // const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/certification/${id}`,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // "authorization": `Bearer ${token}`
    //         }
    //     }
    // );

    // if (!res.ok) {
    //     console.error("Failed to fetch project: ", res.statusText);
    //     return res;
    // }
    // return res;
}