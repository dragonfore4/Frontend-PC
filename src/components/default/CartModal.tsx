import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { deleteProjectFromCart, getCartDetails, getCartIdByUsername } from "@/functions/carts";

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

const CartModal = () => {
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
            if (response === null) {
                setCartItems([]);  // Set the cart items to an empty array
                return;
            }
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

    const visibleItems = cartItems.slice(0, 2);  // Show only the first two items
    const otherItemsCount = cartItems.length - 2;  // Calculate how many other items are there

    return (
        <div className="absolute top-12 flex flex-col p-4 rounded-md right-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-40 bg-white gap-6 cursor-default">
            {cartItems.length === 0 ? (
                <div className="w-max">
                    <div className="pb-4">Cart is Empty</div>
                    <button className="rounded-lg px-2 py-1 ring-1 " onClick={() => window.location.href = "/cart"}>Go to Cart</button>
                </div>
            ) : (
                <>
                    <h2 className='text-2xl font-semibold'>Shopping Cart</h2>
                    <div className='flex flex-col gap-8'>
                        {visibleItems.map((item) => (
                            <div key={item.project_id} className='flex flex-row gap-4'>
                                {/* IMAGE */}
                                <div className='w-[120px] h-[165px] relative'>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_PATH}/project_imagesByName/${item.image1}`}
                                        alt={item.project_name}
                                        fill
                                        className='object-cover rounded-md'
                                    />
                                </div>
                                {/* TEXT */}
                                <div className='w-max'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between gap-4'>
                                            <h1 className='font-semibold'>{item.project_name}</h1>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <span>${item.price}</span>
                                            <div>{item.start_date} - {item.end_date}</div>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <span>Type: {item.project_type_name}</span>
                                            <span>Status: {item.status_name}</span>
                                        </div>
                                        <div className='text-blue-500 cursor-pointer rounded-lg ring-1 px-2  w-max hover:bg-red-300 hover:ring-red-300 hover:text-white' onClick={() => handleRemoveProjectFromCart(item.project_id)}>Remove</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Show 'and X others' if there are more than 2 items */}
                        {otherItemsCount > 0 && (
                            <div className="text-gray-500">
                                and {otherItemsCount} {otherItemsCount === 1 ? 'other' : 'others'}...
                            </div>
                        )}
                    </div>
                    <button className="rounded-lg px-2 py-1 ring-1 hover:bg-blue-400 hover:text-white" onClick={() => window.location.href = "/cart"}>Go to Cart</button>
                </>
            )}
        </div>
    );
};

export default CartModal;
