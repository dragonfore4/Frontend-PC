"use client"

import CartList from '@/components/default/CartList'
import { useAuth } from '../../contexts/AuthContext'
import React, { useState } from 'react'
import { checkout } from '@/functions/transactions'
import { getCartIdByUsername } from '@/functions/carts'
import {  ToastContainer } from 'react-toastify'
import { showToast } from '@/utils/toastUtils'

const CartPage = () => {

    const auth = useAuth();

    const handleCheckout = async () => {
        console.log("clicked")
        if (auth && auth.user) {
            const cart_Id = await getCartIdByUsername(auth!.user);  // Use auth.user.username for cart lookup
            const response = await checkout(cart_Id, auth!.user);  // Get the cart details by cart ID

            if (response) {
                const result = await response.json();
                response.ok ? showToast(result.message,"success") : showToast(result.message,"error")
            }
        }

    }

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
                        <CartList />
                    </div>
                    <h3 className="text-lg font-semibold mb-4">Available Shipping Method</h3>
                    <div className="border p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img src="https://placehold.co/50x50" alt="Fedex Logo" className="w-12 h-12 object-cover mr-4" />
                                <div>
                                    <h4 className="font-semibold">Fedex Delivery</h4>
                                    <p className="text-gray-500">Delivery: 2-3 days work</p>
                                </div>
                            </div>
                            <div className="text-green-500 font-semibold">Free</div>
                            <input type="radio" name="shipping" className="ml-4" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-4">Available International Shipping:</h3>
                    <div className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img src="https://placehold.co/50x50" alt="DHL Logo" className="w-12 h-12 object-cover mr-4" />
                                <div>
                                    <h4 className="font-semibold">DHL Delivery</h4>
                                    <p className="text-gray-500">Delivery: 3-5 days work</p>
                                </div>
                            </div>
                            <div className="text-gray-500 font-semibold">$12.00</div>
                            <input type="radio" name="shipping" className="ml-4" />
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
                            <span className="font-semibold">$397.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Vat (20%)</span>
                            <span className="font-semibold">$2.89</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Total</span>
                            <span className="font-semibold text-xl">$399.89</span>
                        </div>
                        <button className="w-full bg-black text-white py-2 rounded-md font-semibold" onClick={handleCheckout}>Pay $399.89</button>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    )
}

export default CartPage