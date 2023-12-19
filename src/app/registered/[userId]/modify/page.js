"use client"

import React, { useState, useEffect } from 'react'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function ModifyUser() {
    const router = useRouter();
    const params = useParams()
    const [userData, setUserData] = useState(null);

    const [city, setCity] = useState('Madrid');
    const [interests, setInterests] = useState('');
    const [receiveOffers, setReceiveOffers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/users/${params.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setUserData(data.data)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [params.userId])

    if (!userData) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            id: userData.id,
            name: userData.name,
            age: userData.age,
            city: city,
            interests: interests,
            receiveOffers: receiveOffers,
            email: userData.email,
            password: userData.password,
        };

        fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push(`/registered/${params.userId}`)
    }

    const handleDeleteAccount = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete your account?');

        if (isConfirmed) {
            fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userData.id}),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            router.push("/")
        }
    };

    return (
        <section>
            <div>
                <RegisteredNavbar userId={params.userId} userEmail={userData.email} />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 h-96 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="city" className="block text-gray-800 font-bold">City:</label>
                            <select onChange={(e) => setCity(e.target.value)} value={city} name="city" id="city" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" >
                                <option value="" disabled>
                                    Select City
                                </option>
                                <option value="Madrid">Madrid</option>
                                <option value="Barcelona">Barcelona</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="interests" className="block text-gray-800 font-bold">Your interests:</label>
                            <input onChange={(e) => setInterests(e.target.value)} type="text" name="interests" id="interests" placeholder="Software engineering, Cycling,.." className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="offers" className="block text-gray-800 font-bold">Do you want to receive our special offers?</label>
                            <input onChange={(e) => setReceiveOffers(e.target.checked)} type="checkbox" name="offers" id="offers" />
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <button type="submit" className="py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold rounded">Update</button>
                                <button type="button" onClick={handleDeleteAccount} className="py-2 px-4 block mt-6 bg-red-500 text-white font-bold rounded">Delete Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
