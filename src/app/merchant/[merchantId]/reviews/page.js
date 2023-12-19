"use client"

import MerchantNavbar from '@/components/MerchantNavbar';
import ReviewCard from '@/components/ReviewCard'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function FollowersList() {
    const params = useParams()

    const [merchantData, setMerchantData] = useState(null);
    const [reviews, setReviews] = useState([]);

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

                const response = await fetch('/api/reviews', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                let reviewsList = await response.json();
                reviewsList = reviewsList.filter((rev) =>
                    rev.pageId == userResponseData.pageId
                );
                
                setReviews(reviewsList)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [])

    if (!merchantData) {
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
                        {reviews.map(review => (
                            <ReviewCard review={review} key={review.id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}