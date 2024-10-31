"use client"

import { useAuth } from '@/contexts/AuthContext'
import { getCartIdByUsername, getCartDetails, deleteProjectFromCart } from '@/functions/carts';
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image';

interface CartItem {
    cart_id: number;
    project_id: number;
    project_name: string;
    description: string;
    price: number;
    start_date: string;
    end_date: string;
    created_by: string;
    project_type_name: string;
    status_name: string;
    image1: string;
    image2: string;
    image3: string;
}

const CartList = () => {
    const auth = useAuth();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options).replace(/,/g, '');
    };

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchCartDetails = async () => {
        if (auth && auth.user) {
            const cart_Id = await getCartIdByUsername(auth.user);  // Use auth.user.username for cart lookup
            const response = await getCartDetails(cart_Id);  // Get the cart details by cart ID

            // Format the start_date and end_date for each item
            if (response == null) return;
            const formattedCartItems = response.map((item: CartItem) => ({
                ...item,
                start_date: formatDate(item.start_date),
                end_date: formatDate(item.end_date),
            }));

            setCartItems(formattedCartItems);  // Set the formatted cart items
        }
    };

    const handleRemoveProjectFromCart = async (projectId: number) => {
        if (auth && auth.user) {
            const cartId = await getCartIdByUsername(auth.user);  // Get the cart ID by username
            const res = await deleteProjectFromCart(cartId, projectId);  // Delete the project from the cart
            console.log(res)
            fetchCartDetails();  // Fetch the updated cart details
        }
    }

    useEffect(() => {
        fetchCartDetails();
    }, []);

    console.log(cartItems)
    return (

        <div className="flex flex-col items-center  gap-4">
            {cartItems.length > 0 && cartItems.map((item: CartItem) => (
                <div className='flex justify-between w-full' key={item.project_id}>
                    <div className='flex'>
                        <div className='h-20 w-20 relative mb-2 mr-8'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_PATH}/project_imagesByName/${item.image1}`}
                                alt={item.project_name}
                                fill
                                className='object-cover rounded-md'
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">{item.project_name}</h3>
                            {
                                item.description.length > 13 ?
                                    <p className="text-gray-500">{item.description.substring(0, 13)}...</p>
                                    :
                                    <p className="text-gray-500">{item.description}</p>
                            }
                            <p className="font-semibold">{`$${item.price}`}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-8'>
                        <div className=' text-blue-500 cursor-pointer rounded-lg ring-1 px-2  w-max h-max hover:bg-red-300 hover:ring-red-300 hover:text-white' onClick={() => handleRemoveProjectFromCart(item.project_id)}>Remove</div>
                        {item.status_name === "Available" ? (<p></p>) : <p className='text-sm text-red-600 rounded-lg ring-1 px-2 ring-red-500'>Project Sold out Already!!</p>}
                    </div>
                </div>
            ))}
            {
                cartItems.length == 0 && <div>Cart is Empty</div>
            }
        </div>
    )

}

export default CartList