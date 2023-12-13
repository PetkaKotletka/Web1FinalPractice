"use client"

import AdminNavbar from '@/components/AdminNavbar'
import { useParams } from 'next/navigation'

export default function AdminPage() {
    const params = useParams()

    return (
        <section>
            <div>
                <AdminNavbar userId={params.adminId} />
            </div>
            <div>
                <p>Admin id: {params.adminId}</p>
            </div>
        </section>
    )
}
