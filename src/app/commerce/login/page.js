"use client"

import Navbar from '@/components/Navbar';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LoginAdmin() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const redirect = (code) => {
        console.log("Code", code);
        if (code == 200) {
            router.push("/");
        } else if (code == 400) {
            alert("The commerce does not exist.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        }

        fetch("/api/loginCommerce", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
           .then((res) => res.json())
           .then((data) => redirect(data.status))
    }


    return (
        <section className="bg-[#4586ef]">
            <div>
                <Navbar />
            </div>
            <div className="w-full bg-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-white">Login to the system as commerce</p>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input onChange={(e) => setUsername(e.target.value)} 
                                   type="text" 
                                   name="username" 
                                   id="username" 
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                   placeholder="commerce name" 
                                   required="" />
                        </div>
                        <div>
                            <input onChange={(e) => setPassword(e.target.value)} 
                                   type="password" 
                                   name="password" 
                                   id="password" 
                                   placeholder="password" 
                                   x-model="password" 
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                   required="" />
                        </div>
                        <button type="submit" className="w-full text-blue-600 bg-white hover:bg-blue-100 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center">Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}