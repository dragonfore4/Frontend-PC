import { getToken } from "./auth"


export const addProjectToCart = async (cartId: number, projectId: number) => {
    const token = getToken();

    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + `/cart/${cartId}/project`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,  // Ensure you send the authorization token
        },
        body: JSON.stringify({
            project_id: projectId,  // Serialize the request body
        }),
    });

    if (!res.ok) {
        console.error("Failed to add project to cart: ", res.statusText);
        return res;
    }

    return res;
};

export const getCartDetails = async (cartId: number) => {

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/cart/${cartId}/details`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
    
        },
        cache: "no-cache",
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        console.error("Failed to fetch cart details: ", res.statusText);
        return null;
    }
}

export const deleteProjectFromCart = async (cartId: number, projectId: number) => {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/cart/${cartId}/project/${projectId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error("Failed to delete project from cart: ", res.statusText);
        return res;
    }

    return res;
}

export const getCartIdByUsername = async (username: string) => {
    const token = getToken();  // Get the token from somewhere (e.g., localStorage)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/cart/username/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`  // Pass the token in the header
        }
    });

    if (res.ok) {
        const data = await res.json();
        console.log("Cart ID:", data.cart_id);
        return data.cart_id;
    } else {
        const errorData = await res.json();
        console.error("Error fetching cart ID:", errorData.message);
        return null;
    }
};