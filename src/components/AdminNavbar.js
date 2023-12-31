import Link from 'next/link'

export default function AdminNavbar({ userId }) {
    return (
        <header>
            <nav>
                <div className="flex justify-between h-16 px-10 shadow items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">Connexy</h1>
                        <div className="hidden md:flex justify-around space-x-4">
                            <Link href={`/admin/${userId}`} className="hover:text-indigo-600 text-gray-700">Home</Link>
                            <Link href={`/admin/${userId}/merchantList`} className="hover:text-indigo-600 text-gray-700">Merchants list</Link>
                            <Link href={`/admin/${userId}/createMerchant`} className="hover:text-indigo-600 text-gray-700">Register merchant</Link>
                        </div>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link href="#" className="text-gray-800 text-sm">admin</Link>
                        <Link href="/" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">LOGOUT</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}