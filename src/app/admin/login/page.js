"use client"

import Navbar from '@/components/Navbar';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LoginAdmin() {

    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const admin = {
            username: username,
            password: password,
        }

        const userExistsResponse = await fetch('/api/checkAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(admin),
        });

        const data = await userExistsResponse.json()

        if (data.status == 500) {
            alert(data.message)
            return
        } else if (!data.exists) {
            alert(data.message)
            return
        }

        router.push(`/admin/${data.adminId}`)
    }


    return (
        <section>
            <div>
                <Navbar />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-gray-800 font-bold">Administrator username:</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="username" name="username" id="username" placeholder="username" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
      
                            <Link href="/registered/login" className="text-sm font-thin text-gray-800 hover:underline mt-2 mr-3 inline-block hover:text-indigo-600">Not an administrator?</Link>
                        </div>
                        <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}