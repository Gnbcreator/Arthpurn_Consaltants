'use client'
import Header from '@/app/componets/Header';
import Sidenavbar from '@/app/componets/Sidenavbar';
import React, { useEffect, useState } from 'react';
import { UserData } from '@/app/contexapi';
import axios from 'axios';


export default function Layout({ children }) {
    const [userdata, setUserData] = useState();

    const getData = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/user-details`,
            {},
            {
                withCredentials: true
            }
        )

        setUserData(response.data?.user)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <UserData.Provider value={userdata}>
                <div className='relative bg-gray-100  w-screen'>
                    <header className='z-50 fixed top-0 border border-b-gray-200 w-full bg-white right-0 left-0 py-1 px-5 '>
                        <div className=''><Header /></div>
                    </header>
                    <aside className='z-50 fixed bg-white border right-0 left-0 bottom-0 border-gray-200 md:w-[100px] lg:w-[100px]  md:top-[49px] lg:top-[49px] md:bottom-0 lg:bottom-0 md:left-0 lg:left-0'>
                        <div className=''>
                            <Sidenavbar />
                        </div>
                    </aside>
                    <main className=' lg:fixed md:fixed h-full right-0 left-[99px] top-[49px] border  border-gray-200'>
                        {children}
                    </main>
                </div>
            </UserData.Provider>


        </>
    );
}
