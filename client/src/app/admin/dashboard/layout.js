'use client'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from "react"
import axios from "axios"
import { AdminData } from "@/app/contexapi"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"

function Layout({ children }) {
    const [adminData, setAdminData] = useState();
    const pathname = usePathname();

    const segment = pathname.split("/")
    const currentPage = segment[segment.length - 1] || 'dashboard'
    const getData = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/admin/admin-details`,
            {},
            {
                withCredentials: true
            }
        )

        setAdminData(response.data?.admin)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <AdminData.Provider value={adminData}>
            <SidebarProvider>
                <aside className="">
                    <AppSidebar />
                </aside>
                <SidebarInset>
                    <div className="w-full relative">
                        <header className="flex p-[12px] z-40 fixed border-b  w-full bg-white top-0 ">
                            <SidebarTrigger className="lg:hidden xl:hidden 2xl:hidden" />
                            <Breadcrumb>

                                <BreadcrumbItem>
                                    <BreadcrumbPage className=" font-medium capitalize">{currentPage}</BreadcrumbPage>
                                </BreadcrumbItem>

                            </Breadcrumb>
                        </header>
                        <hr />
                        <main className=" fixed top-12 right-0 left-0 md:left-[255px] lg:left-[255px]">
                            {children}
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AdminData.Provider>
    )
}

export default Layout;