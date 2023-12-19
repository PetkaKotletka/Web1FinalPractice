"use client"

export default function Webpage({ pageData }) {
    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
            <p className="text-gray-700 mb-8">{pageData.summary}</p>

            <div className="mb-4">
                <p className="text-blue-500 font-semibold mb-2">Images:</p>
                <ul>
                    {pageData.photos.map((photo, index) => (
                        <li key={index} className="list-disc ml-4">{photo}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <p className="text-blue-500 font-semibold mb-2">Texts:</p>
                <ul>
                    {pageData.texts.map((text, index) => (
                        <li key={index} className="list-disc ml-4">{text}</li>
                    ))}
                </ul>
            </div>

            <h3 className="text-lg font-semibold">We'll modify this page in 2Q</h3>
        </section>
    )
}