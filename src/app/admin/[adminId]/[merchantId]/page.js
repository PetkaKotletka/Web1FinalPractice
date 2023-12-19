"use client"

import { useState, useEffect } from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function ModifyMerchant() {
    const router = useRouter();
    const params = useParams()
    const [userData, setUserData] = useState(null);

    const [cif, setCif] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/merchants/${params.merchantId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                setUserData(data)
                setCif(data.cif);
                setEmail(data.email);
                setPhone(data.phone);

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
            pageId: userData.pageId,
            name: userData.name,
            password: userData.password,
            cif: cif,
            email: email,
            phone: phone,
        };

        fetch('/api/merchants', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        alert('Changes saved')
        router.push(`/admin/${params.adminId}`)
    }

    const handleDeleteAccount = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this account?');

        if (isConfirmed) {
            fetch('/api/merchants', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userData.id}),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            fetch('/api/pages', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userData.pageId}),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            router.push(`/admin/${params.adminId}`)
        }
    };

    return (
        <section>
            <div>
                <AdminNavbar userId={params.adminId} />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 h-96 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cif" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIF</label>
                            <input onChange={(e) => setCif(e.target.value)} value={cif} type="number" name="cif" id="cif" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact phone number:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                    </svg>
                                </div>
                                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" id="phone" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="123-456-789" required="" />
                            </div>
                            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <button type="submit" className="py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold rounded">Update</button>
                                <button type="button" onClick={handleDeleteAccount} className="py-2 px-4 block mt-6 bg-red-500 text-white font-bold rounded">Delete merchant</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
