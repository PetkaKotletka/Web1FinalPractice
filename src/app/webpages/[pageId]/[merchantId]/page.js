"use client"

import MerchantNavbar from '@/components/MerchantNavbar'
import Webpage from '@/components/Webpage'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function MerchantWebpage() {
    const params = useParams()
    const [merchantData, setMerchantData] = useState(null);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const response = await fetch(`/api/merchants/${params.merchantId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMerchantData(data)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchMerchantData()
    }, [params.merchantId])

    useEffect(() => {
        const fetchPageData = async () => {
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

        fetchPageData()
    }, [params.pageId])

    if (!merchantData || !pageData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <MerchantNavbar merchantId={params.merchantId} merchantName={merchantData.name} />
            </div>
            <div>
                <Webpage pageData={pageData} />
            </div>
        </section>
    )
}