'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuItem,
    NavigationMenuLink
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu } from 'lucide-react';



export default function Navbar(props) {
    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <nav className='p-3  z-52  lg:flex lg:justify-between container mx-auto h-fit  lg:w-[1024px] '>
                <div>
                    <Image
                        alt='logo'
                        src='/accets/AClogo.png'
                        width={200}
                        height={200}
                        quality={100}
                        className='w-10 h-10'
                    />
                </div>
                <div className='absolute lg:hidden top-5 right-4 '>
                    <Menu onClick={handleOpenMenu} className=' text-purple-700 w-7 h-7 clear-both hover:text-blue-700 ' />
                </div>
                <div >
                    <NavigationMenu className="">
                        <NavigationMenuList className="hidden lg:flex gap-10">
                            <NavigationMenuItem >
                                <Link href={"#"} className='text-lg hover:bg-purple-200'>
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href={"#"} className='text-lg '>
                                    About
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href={"#"} className='text-lg '>
                                    Contanct
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href={"#"} className='text-lg '>
                                    Pricing
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className=" ">
                                <Link href={"#"} className='text-lg '>
                                    <Button variant="secondary" className="">Get Started</Button>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>


            <div className={` ${openMenu ? "translate-y-0 rounded-b-xl z-20 " : " -translate-y-96 "} bg-white absolute top-16   transition-all animate-accordion-down  lg:flex `}>
                <NavigationMenu className=" py-5 w-full">
                    <NavigationMenuList className="grid px-3 py-3 grid-cols-1 w-screen  col-span-1 gap-3 ">
                        <NavigationMenuItem>
                            <Link href={"#"} className='text-lg '>
                                Home
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href={"#"} className='text-lg '>
                                About
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href={"#"} className='text-lg '>
                                Contanct
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href={"#"} className='text-lg '>
                                Pricing
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="  col-span-1">
                            <Link href={"#"} className='text-lg '>
                                <Button variant="secondary" className="w-full">Get Started</Button>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

        </>
    );
}
