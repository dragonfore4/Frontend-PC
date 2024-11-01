"use client"

import CartList from '@/components/default/CartList'
import { useAuth } from '../../contexts/AuthContext'
import React, { useEffect, useState } from 'react'
import { checkout } from '@/functions/transactions'
import { deleteProjectFromCart, getCartDetails, getCartIdByUsername } from '@/functions/carts'
import { ToastContainer } from 'react-toastify'
import { showToast } from '@/utils/toastUtils'
import Image from 'next/image'

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


const CartPage = () => {

    const auth = useAuth();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

    const handleCheckout = async () => {
        console.log("clicked")
        if (auth && auth.user) {
            const cart_Id = await getCartIdByUsername(auth!.user);  // Use auth.user.username for cart lookup
            const response = await checkout(cart_Id, auth!.user);  // Get the cart details by cart ID

            if (response) {
                const result = await response.json();
                response.ok ? showToast(result.message, "success") : showToast(result.message, "error")
            }
        }

    }

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
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md ring-1 ring-gray-200">
            <header className="flex justify-between items-center pb-6 border-b">
                <h1 className="text-2xl font-bold">Cart Page.</h1>
            </header>
            <div className="flex flex-row gap-6">
                <div className='p-6'>
                    <h2 className="text-xl font-semibold mb-4">Summary Order</h2>
                    <p className="text-gray-500 mb-4">Check your item and select your shipping for better experience order item.</p>
                    <div className="border p-4 rounded-md mb-6">
                        {/* <CartList /> */}
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
                    </div>


                </div>
                <div className='bg-[#f9fafc] p-6'>
                    <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                    <p className="text-gray-500 mb-4">Complete your purchase item by providing your payment details order.</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                        <input type="email" className="w-full border p-2 rounded-md" value="barryvallendot@gmail.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Card Detail</label>
                        <div className="flex space-x-2">
                            <input type="text" className="w-1/2 border p-2 rounded-md" placeholder="Card Number" />
                            <input type="text" className="w-1/4 border p-2 rounded-md" placeholder="MM / YY" />
                            <input type="text" className="w-1/4 border p-2 rounded-md" placeholder="CVC" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Card Holder</label>
                        <input type="text" className="w-full border p-2 rounded-md" value="Barry Vallenot" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Billing Address</label>
                        <input type="text" className="w-full border p-2 rounded-md mb-2" value="7851 Garfield Ave, Huntington Beach" />
                        <div className="flex space-x-2">
                            <input type="text" className="w-1/2 border p-2 rounded-md" value="California(CA)" />
                            <input type="text" className="w-1/2 border p-2 rounded-md" value="92648" />
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold">${cartItems.reduce((acc, cartItem) => acc + Number(cartItem.price),0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Vat (0%)</span>
                            <span className="font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Total</span>
                            <span className="font-semibold text-xl">${cartItems.reduce((acc, cartItem) => acc + Number(cartItem.price),0).toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-2 rounded-md font-semibold" onClick={handleCheckout}>Pay ${cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)}</button>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    )
}

export default CartPage