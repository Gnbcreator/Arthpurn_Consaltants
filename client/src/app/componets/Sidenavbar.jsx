'use client'
import React from 'react'
import Link from 'next/link'
import { BellRing, icons, Images, ListVideo, MessageSquare, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'

const links = [
    { icon: <MessageSquare />, link: "/user/dashboard/chats", lable: "chats" },
    { icon: <ListVideo />, link: "/user/dashboard/courses", lable: "courses" },
    { icon: <Images />, link: "/user/dashboard/gallery", lable: "Gallery" },
    { icon: <Users />, link: "/user/dashboard/appointment", lable: "Appointment" },
    { icon: <BellRing />, link: "/user/dashboard/activity", lable: "Activity" },
]


export default function Sidenavbar() {

    const pathname = usePathname();

    return (
        <>
            <div className=''>
                <ul className=" z-20 flex md:flex-col lg:flex-col w-full gap-3 md:mt-5 lg:mt-5">
                    {
                        links.map((item, index) => (
                            <li key={index} className={` ${pathname === item.link ? "  transition-all bg-purple-200  hover:bg-purple-200  " : " "} mx-auto w-[80%] rounded-md  list-none py-2 transition-all  hover:bg-gray-200`}>
                                <Link href={item.link} className={` flex flex-col`} prefetch={true}>
                                    <span className='mx-auto text-gray-700 hover:text-purple-500'>{item.icon}</span>
                                    <small className='mx-auto text-gray-700 tracking-tighter'>{item.lable}</small>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div >
        </>
    )
}
