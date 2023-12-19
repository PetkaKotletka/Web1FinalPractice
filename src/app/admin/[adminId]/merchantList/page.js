"use client"

import AdminNavbar from '@/components/AdminNavbar'
import MerchantCard from '@/components/MerchantCard'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function MerchantsList() {
    const params = useParams()
    const [merchantsData, setMerchantsData] = useState(null);
    const [pagesData, setPagesData] = useState(null);
    const [merchants, setMerchants] = useState([]);
    const [city, setCity] = useState('any');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/merchants', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                const pageResponse = await fetch('/api/webpages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const pageResponseData = await pageResponse.json();
                setPagesData(pageResponseData)
                console.log(data)
                for (const mrch of data) {
                    const matchingPage = pageResponseData.find(page => page.id == mrch.pageId);
                    if (matchingPage.city == '' || matchingPage.state == 0) {
                        mrch.city = 'Not stated'
                    } else {
                        mrch.city = matchingPage.city;
                    }
                }

                setMerchantsData(data)
                setMerchants(data)

            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()

        let merchantsList = merchantsData
        if (searchTerm != '') {
            merchantsList = merchantsList.filter((merchant) =>
                merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (city != 'any') {
            merchantsList = merchantsList.filter((merchant) =>
                merchant.city == city
            );
        }

        setMerchants(merchantsList)

    }

    if (!merchantsData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <AdminNavbar userId={params.adminId} />
            </div>
            <div className="h-screen bg-white shadow-inner flex justify-center">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                        <div className="flex">
                            <input type="text" placeholder="Search for merchants..." onChange={(e) => setSearchTerm(e.target.value)}
                                   className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-500" />
                            <button type="submit" className="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
                        </div>
                        <select id="city" name="city" onChange={(e) => setCity(e.target.value)}
                                className="w-full h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-500 text-gray-700 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                            <option value="any">Any city</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                        </select>
                    </form>
                    <div className='grid mt-8'>
                        {merchants.map(merchant => (
                            <MerchantCard merchant={merchant} adminId={params.adminId} key={merchant.id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}