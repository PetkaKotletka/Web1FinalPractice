"use client"

import React, { useState, useEffect } from 'react'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import { useParams } from 'next/navigation'

export default function UserPage() {
    const params = useParams()
    const [userData, setUserData] = useState(null);

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

    return (
        <section>
            <div>
                <RegisteredNavbar userId={params.userId} userEmail={userData.email} />
            </div>
            <div>
                <p>User id: {params.userId}</p>
            </div>
        </section>
    )
}
