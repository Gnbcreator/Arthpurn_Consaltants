import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Mail, Settings,User } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useData } from '@/app/contexapi';
import Link from 'next/link'
export default function Header() {

    const user = useData();

    return (
        <>
            <header className=' flex justify-between gap-7 py-1 md:py-0'>
                {/* logos and branding */}
                <div className='flex my-auto flex-1'>
                    <Image
                        alt='logo'
                        width={100}
                        height={100}
                        quality={100}
                        src={'/accets/AClogo.png'}
                        className='w-8 h-7 md:w-10 md:h-10 lg:w-10 lg:h-10'
                    />
                    <h1 className='my-auto text-[12px] md:text-xl lg:text-xl font-semibold mx-2'>Arthpurn Consaltants</h1>
                </div>
                {/* Messages and Notifications */}
                <div className='flex  gap-7'>
                    <Mail className=' my-auto hover:text-purple-600 transition-all  text-gray-700' />
                </div>
                {/* Avatar */}
                <div className='flex'>
                    <Popover className="">
                        <PopoverTrigger asChild>
                            <Avatar className="my-auto">
                                <AvatarImage src="https://github.com/shadcn.png" />      {/* avtart will be added after  it will be upload by the user dynamically */}
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-0" align='left'>
                            <div className='my-2'>
                                <Avatar className="mx-auto">
                                    <AvatarImage src="https://github.com/shadcn.png" />      {/* avtart will be added after  it will be upload by the user dynamically */}
                                </Avatar>
                                <h1 className='text-md text-center'>{user?.fullname}</h1>
                                <h1 className='text-sm text-center'>{user?.email}</h1>
                            </div>
                            <hr />
                            <div className='my-3'>
                                <li className='list-none mt-2 hover:bg-gray-200 px-2 py-1 rounded-sm'>
                                    <Link href="/user/profile" className='flex gap-2'>
                                        <User className='w-5 h-5' />
                                        <span className='text-sm'>Profile</span>
                                    </Link>
                                </li>
                                <li className='list-none mt-2 hover:bg-gray-200 px-2 py-1 rounded-sm'>
                                    <Link href="#" className='flex gap-2'>
                                        <Settings className='w-5 h-5' />
                                        <span className='text-sm'>setting</span>
                                    </Link>
                                </li>
                                <li className='list-none mt-2 hover:bg-gray-200 px-2 py-1 rounded-sm'>
                                    <Link href="#" className='flex gap-2'>
                                        <LogOut className='w-5 h-5' />
                                        <span className='text-sm'>Logout</span>
                                    </Link>
                                </li>
                            </div>
                        </PopoverContent>
                    </Popover>


                </div>
            </header>
        </>
    )
}
