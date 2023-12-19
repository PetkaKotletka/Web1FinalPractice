"use client"

import AdminNavbar from '@/components/AdminNavbar'
import AdminWelcomePage from '@/components/AdminWelcomePage';

import { useParams } from 'next/navigation'

export default function AdminPage() {
    const params = useParams()

    return (
        <section>
            <div>
                <AdminNavbar userId={params.adminId} />
            </div>
            <div>
                <AdminWelcomePage userId={params.adminId} />
            </div>
        </section>
    )
}