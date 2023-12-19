"use client"

import Navbar from '@/components/Navbar'
import Webpage from '@/components/Webpage'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function DefaultWebpage() {
    const params = useParams()
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/webpages/${params.pageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setPageData(data)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [params.pageId])

    if (!pageData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <Navbar />
            </div>
            <div>
                <Webpage pageData={pageData} />
            </div>
        </section>
    )
}