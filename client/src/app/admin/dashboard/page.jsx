import React from 'react'
import { redirect } from 'next/navigation'

function page() {
    redirect("/admin/dashboard/chats")
    return (
        <div className=''> Admin-Dashboard</div>
    )
}

export default page