"use client"

import MerchantNavbar from '@/components/MerchantNavbar'
import MerchantWelcomePage from '@/components/MerchantWelcomePage';

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function MerchantPage() {
    const params = useParams()
    const [merchantData, setMerchantData] = useState(null);

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
                setMerchantData(data)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [params.merchantId])

    if (!merchantData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <MerchantNavbar merchantId={params.merchantId} merchantName={merchantData.name} />
            </div>
            <div>
                <MerchantWelcomePage userId={params.merchantId} />
            </div>
        </section>
    )
}