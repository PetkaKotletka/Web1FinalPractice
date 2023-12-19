"use client"

import { useRouter } from 'next/navigation'

export default function MerchantCard({ merchant, adminId }) {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault()

        fetch('/api/merchants', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: merchant.id}),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        fetch('/api/pages', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: merchant.pageId}),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        window.location.reload();
        alert(`Merchant ${merchant.name} deleted`)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        router.push(`/admin/${adminId}/${merchant.id}`)
    }

    return (
        <div className="mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{merchant.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">City: {merchant.city}</p>
            <div className="flex items-center space-x-4">
                <button onClick={handleUpdate} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Update information
                </button>
                <button onClick={handleDelete} type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Delete
                </button>
            </div>
        </div>
    )
}