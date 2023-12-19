"use client"

import MerchantNavbar from '@/components/MerchantNavbar'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ModifyPage() {
    const params = useParams()
    const router = useRouter();
    const [pageData, setPageData] = useState(null);
    const [userData, setUserData] = useState(null);

    const [city, setCity] = useState('');
    const [activity, setActivity] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [texts, setTexts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [initialValuesSet, setInitialValuesSet] = useState(false);

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
                setUserData(userResponseData);

                const pageResponse = await fetch(`/api/webpages/${userResponseData.pageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const pageResponseData = await pageResponse.json();
                setPageData(pageResponseData);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, [params.merchantId]);

    useEffect(() => {
        if (pageData && pageData.state == 1 && !initialValuesSet) {
            setCity(pageData.city);
            setActivity(pageData.activity);
            setTitle(pageData.title);
            setSummary(pageData.summary);
            setTexts(pageData.texts);
            setPhotos(pageData.photos);

            setInitialValuesSet(true);
        }
    }, [pageData, initialValuesSet]);

    const handlePhotosChange = (e) => {
        const inputText = e.target.value;
        const filenames = inputText.split(',').map((filename) => filename.trim());
        setPhotos(filenames);
    };

    const handleTextsChange = (e) => {
        const inputText = e.target.value;
        const filenames = inputText.split(',').map((filename) => filename.trim());
        setTexts(filenames);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const page = {
            id: pageData.id,
            state: 1,
            city: city,
            activity: activity,
            title: title,
            summary: summary,
            texts: texts,
            photos: photos,
            scoring: pageData.scoring,
            visits: pageData.visits,
            reviews: pageData.reviews,
        }

        fetch('/api/webpages', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(page),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        alert('Changes saved')
        router.push(`/merchant/${params.merchantId}/modifyPage`)
    }

    const redirectToPreview = async (e) => {
        const page = {
            id: pageData.id,
            state: 1,
            city: city,
            activity: activity,
            title: title,
            summary: summary,
            texts: texts,
            photos: photos,
            scoring: pageData.scoring,
            visits: pageData.visits,
            reviews: pageData.reviews,
        }

        fetch('/api/webpages', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(page),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push(`/webpages/${pageData.id}/${params.merchantId}/`)
    }

    if (!pageData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div>
                <MerchantNavbar merchantId={params.merchantId} merchantName={userData.name} />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update my webpage
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <select onChange={(e) => setCity(e.target.value)} 
                                            value={city}
                                            id="city"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="" disabled>
                                            Select City
                                        </option>
                                        <option value="Madrid">Madrid</option>
                                        <option value="Barcelona">Barcelona</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity</label>
                                    <select onChange={(e) => setActivity(e.target.value)} 
                                            value={activity} 
                                            id="activity" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="" disabled>
                                            Select Activity
                                        </option>
                                        <option value="Football">Football</option>
                                        <option value="Politics">Politics</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                                    <input onChange={handlePhotosChange}
                                           value={photos}
                                           type="text" 
                                           name="photos" 
                                           id="photos" 
                                           aria-describedby="helper-text-explanation"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                           pattern="^[a-zA-Z0-9]+\.[a-zA-Z0-9]+(\s*,\s*[a-zA-Z0-9]+\.[a-zA-Z0-9]+)*$" 
                                           placeholder="image1.jpg, image2.png, ..." />
                                </div>
                                <div>
                                    <label htmlFor="texts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Texts</label>
                                    <input onChange={handleTextsChange}
                                           value={texts}
                                           type="text" 
                                           name="texts" 
                                           id="texts" 
                                           aria-describedby="helper-text-explanation" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                           pattern="^[a-zA-Z0-9]+\.[a-zA-Z0-9]+(\s*,\s*[a-zA-Z0-9]+\.[a-zA-Z0-9]+)*$" 
                                           placeholder="text1.txt, text2.pdf, ..." />
                                </div>
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input onChange={(e) => setTitle(e.target.value)}
                                           value={title}
                                           type="text" 
                                           name="title" 
                                           id="title" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                           placeholder="Football news" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
                                    <textarea id="summary" 
                                              rows="5"
                                              onChange={(e) => setSummary(e.target.value)}
                                              value={summary}
                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                              placeholder="Write a summary..."></textarea>                    
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Save changes
                                </button>
                                <button type="button" onClick={redirectToPreview} className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-indigo-600 to-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        See preview
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}