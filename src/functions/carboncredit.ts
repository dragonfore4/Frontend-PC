import { getToken } from "./auth";

export const readCarbonCredit = async (id: number) => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/carboncredits/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `Bearer ${token}`
            }
        }
    );

    // if (!res.ok) {
    //     console.error("Failed to fetch project: ", res.statusText);
    //     return null;
    // }
    return res;
}

export const update = async (carbon_credit_id: number, carbon_amount: number) => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/carboncredits/`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                carbon_credit_id,
                carbon_amount
            })
        }
    )

    if (!res.ok) {
        console.error("Failed to update")
        return null;
    }

    return res;
}

export const listCarbonCreditByProjectId = async (projectId: number) => {
    const token = getToken();
    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/carboncredits/project/${projectId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `Bearer ${token}`
            },
            cache: "no-cache"
        }
    );
    if (!res.ok) {
        console.error("Failed to fetch project: ", res.statusText);
        return null;
    }
    return res;
}