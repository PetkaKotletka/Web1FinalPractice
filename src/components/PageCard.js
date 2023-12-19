"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

export default function PageCard({ page, userId, userName }) {
    const router = useRouter();

    const [isReviewVisible, setIsReviewVisible] = useState(false);
    const [review, setReview] = useState('');

    const handleRedirect = (e) => {
        e.preventDefault()

        router.push(`/webpages/${page.id}`)
    }

    const redirectToReview = (e) => {
        e.preventDefault()

        setIsReviewVisible(true)
    }

    const postReview = async (e) => {
        e.preventDefault()

        const reviewId = uuidv4()

        const reviewObj = {
            id: reviewId,
            pageId: page.id,
            userId: userId,
            userName: userName,
            content: review,
        }

        fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        alert('Review sent');
        router.push(`/registered/${userId}`)
    }

    return (
        <div className="mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{page.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{page.summary}</p>
            <div className="flex items-center space-x-4">
                <button onClick={handleRedirect} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Go to page
                </button>
                {userId != '' && (
                    <button type="button" onClick={redirectToReview} className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-indigo-600 to-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Leave review
                        </span>
                    </button>
                )}
            </div>
            {isReviewVisible && (
                <div>
                    <textarea
                        className="mt-3 p-2 border border-gray-300 rounded-md w-full resize-none"
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..." />
                    <button onClick={postReview} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Send
                    </button>
                </div>
            )}
        </div>
    )
}