import Link from 'next/link'

export default function MerchantNavbar({ merchantId, merchantName }) {
    return (
        <header>
            <nav>
                <div className="flex justify-between h-16 px-10 shadow items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">Connexy</h1>
                        <div className="hidden md:flex justify-around space-x-4">
                            <Link href={`/merchant/${merchantId}`} className="hover:text-indigo-600 text-gray-700">Home</Link>
                            <Link href={`/merchant/${merchantId}/modifyPage`} className="hover:text-indigo-600 text-gray-700">My page</Link>
                            <Link href={`/merchant/${merchantId}/followers`} className="hover:text-indigo-600 text-gray-700">Followers</Link>
                            <Link href={`/merchant/${merchantId}/reviews`} className="hover:text-indigo-600 text-gray-700">Reviews</Link>
                        </div>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link href="#" className="text-gray-800 text-sm">{merchantName}</Link>
                        <Link href="/" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">LOGOUT</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}