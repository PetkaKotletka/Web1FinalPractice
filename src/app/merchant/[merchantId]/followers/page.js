"use client"

import MerchantNavbar from '@/components/MerchantNavbar';
import UserCard from '@/components/UserCard'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function FollowersList() {
    const params = useParams()

    const [users, setUsers] = useState([]);
    const [merchantData, setMerchantData] = useState(null);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`/api/merchants/${params.merchantId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const userResponseData = await userResponse.json();
                setMerchantData(userResponseData);

                const pageResponse = await fetch(`/api/webpages/${userResponseData.pageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const pageResponseData = await pageResponse.json();
                setPageData(pageResponseData);

                const response = await fetch('/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                let usersList = await response.json();
                usersList = usersList.filter((user) =>
                    (user.city == pageResponseData.city || pageResponseData.state == 0 || pageResponseData.city == '') &&
                    (user.interests.map(interest => interest.toString().toLowerCase()).includes(pageResponseData.activity.toString().toLowerCase()) || pageResponseData.state == 0)
                );
                
                setUsers(usersList)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [])

    if (!pageData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <MerchantNavbar merchantId={params.merchantId} merchantName={merchantData.name} />
            </div>
            <div className="h-screen bg-white shadow-inner flex justify-center">
                <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
                    <div className='grid mt-8'>
                        {users.map(user => (
                            <UserCard user={user} key={user.id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}