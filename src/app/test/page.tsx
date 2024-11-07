import ProductList from '@/components/default/ProductList';
import React from 'react'
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";


const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Fialed to fetch api data")
    }

    return response.json();
}

async function TestPage() {

    const apiData = await getData();


    return (
        <div className='w-max'>
            <div>
                {JSON.stringify(apiData)}
            </div>
        </div>
    )
}

export default TestPage