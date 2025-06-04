'use client'
import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { ArrowLeft, Paperclip, Search, Send, Smile } from 'lucide-react';
import { sendMessages } from '@/app/sockets/clientSocket';


const chatList = [
    {
        id: 'grp1',
        name: 'Frontend Fanatics',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=21',
        lastMessage: 'We’re moving to Tailwind 4 next week!',
        timestamp: '2025-04-07T10:24:00Z',
        history: [
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' },
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' },
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' },
        ]
    },
    {
        id: 'grp2',
        name: 'Backend Bosses',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=22',
        lastMessage: 'Redis cache flushed accidentally 💀',
        timestamp: '2025-04-07T09:12:00Z',
        history: [
            { sender: 'Liam', receiver: 'Backend Bosses', message: 'Redis cache flushed accidentally 💀', time: '2025-04-07T09:12:00Z' },
            { sender: 'you', receiver: 'Backend Bosses', message: 'Broooo... not again 😩', time: '2025-04-07T09:13:00Z' },
            { sender: 'Raj', receiver: 'Backend Bosses', gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif', time: '2025-04-07T09:14:00Z' }
        ]
    },
    {
        id: 'grp3',
        name: 'DevOps Daily',
        online: false,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=23',
        lastMessage: 'CI/CD pipeline is back online!',
        timestamp: '2025-04-07T08:55:00Z',
        history: [
            { sender: 'Sophia', receiver: 'DevOps Daily', message: 'CI/CD pipeline is back online!', time: '2025-04-07T08:55:00Z' },
            { sender: 'you', receiver: 'DevOps Daily', message: 'Finally 🙌', time: '2025-04-07T08:56:00Z' },
            { sender: 'Jay', receiver: 'DevOps Daily', gif: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif', time: '2025-04-07T08:57:00Z' }
        ]
    },
    {
        id: 'grp4',
        name: 'Product & Design',
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=24',
        lastMessage: 'Figma file has been updated with the new theme.',
        timestamp: '2025-04-06T18:44:00Z',
        history: [
            { sender: 'you', receiver: 'Product & Design', message: 'Can someone update the Figma theme?', time: '2025-04-06T18:20:00Z' },
            { sender: 'Nina', receiver: 'Product & Design', message: 'Just pushed changes.', time: '2025-04-06T18:30:00Z' },
            { sender: 'Nina', receiver: 'Product & Design', image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg', time: '2025-04-06T18:44:00Z' }
        ]
    },
    {
        id: 'admin1',
        name: 'Alice Morgan',
        type: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=31',
        lastMessage: 'I pushed the hotfix to production 🚀',
        timestamp: '2025-04-07T11:05:00Z',
        history: [
            { sender: 'you', receiver: 'Alice Morgan', message: 'Hotfix done?', time: '2025-04-07T10:50:00Z' },
            { sender: 'Alice Morgan', receiver: 'you', message: 'I pushed the hotfix to production 🚀', time: '2025-04-07T11:05:00Z' },
            { sender: 'Alice Morgan', receiver: 'you', image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', time: '2025-04-07T11:06:00Z' }
        ]
    },
    {
        id: 'admin2',
        name: 'Benjamin Lin',
        type: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=32',
        lastMessage: 'Let’s discuss architecture changes tomorrow.',
        timestamp: '2025-04-07T10:50:00Z',
        history: [
            { sender: 'Benjamin Lin', receiver: 'you', message: 'Let’s discuss architecture changes tomorrow.', time: '2025-04-07T10:50:00Z' },
            { sender: 'you', receiver: 'Benjamin Lin', message: 'Sure, blocking some time after lunch.', time: '2025-04-07T10:52:00Z' }
        ]
    },
    {
        id: 'admin3',
        name: 'Claire Zhu',
        type: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=33',
        lastMessage: 'Please update the sprint board before EOD.',
        timestamp: '2025-04-07T09:45:00Z',
        history: [
            { sender: 'Claire Zhu', receiver: 'you', message: 'Please update the sprint board before EOD.', time: '2025-04-07T09:45:00Z' },
            { sender: 'you', receiver: 'Claire Zhu', message: 'On it! 💪', time: '2025-04-07T09:46:00Z' }
        ]
    },
    {
        id: 'admin4',
        name: 'Daniel Reed',
        type: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=34',
        lastMessage: 'New icon set is ready for review.',
        timestamp: '2025-04-07T09:20:00Z',
        history: [
            { sender: 'you', receiver: 'Daniel Reed', message: 'Icons ready?', time: '2025-04-07T09:00:00Z' },
            { sender: 'Daniel Reed', receiver: 'you', message: 'New icon set is ready for review.', time: '2025-04-07T09:20:00Z' },
            { sender: 'Daniel Reed', receiver: 'you', image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg', time: '2025-04-07T09:21:00Z' }
        ]
    },
    {
        id: 'admin5',
        name: 'Elena Vasquez',
        type: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=35',
        lastMessage: 'Regression testing done, looks solid.',
        timestamp: '2025-04-07T08:30:00Z',
        history: [
            { sender: 'you', receiver: 'Elena Vasquez', message: 'How’s the regression test looking?', time: '2025-04-07T08:15:00Z' },
            { sender: 'Elena Vasquez', receiver: 'you', message: 'Regression testing done, looks solid.', time: '2025-04-07T08:30:00Z' },
            { sender: 'Elena Vasquez', receiver: 'you', gif: 'https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif', time: '2025-04-07T08:32:00Z' }
        ]
    },
    {
        id: 'grp5',
        name: 'All Hands',
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=25',
        lastMessage: 'Townhall slides ready. See you at 5 PM!',
        timestamp: '2025-04-06T16:00:00Z',
        history: [
            { sender: 'Anna', receiver: 'All Hands', message: 'Townhall slides ready. See you at 5 PM!', time: '2025-04-06T16:00:00Z' },
            { sender: 'you', receiver: 'All Hands', message: 'Thanks! Looking forward to it.', time: '2025-04-06T16:01:00Z' },
            { sender: 'Anna', receiver: 'All Hands', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', time: '2025-04-06T16:02:00Z' }
        ]
    },
    {
        id: 'grp1',
        name: 'Frontend Fanatics',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=21',
        lastMessage: 'We’re moving to Tailwind 4 next week!',
        timestamp: '2025-04-07T10:24:00Z',
        history: [
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' }
        ]
    },
    {
        id: 'grp2',
        name: 'Backend Bosses',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=22',
        lastMessage: 'Redis cache flushed accidentally 💀',
        timestamp: '2025-04-07T09:12:00Z',
        history: [
            { sender: 'Liam', receiver: 'Backend Bosses', message: 'Redis cache flushed accidentally 💀', time: '2025-04-07T09:12:00Z' },
            { sender: 'you', receiver: 'Backend Bosses', message: 'Broooo... not again 😩', time: '2025-04-07T09:13:00Z' },
            { sender: 'Raj', receiver: 'Backend Bosses', gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif', time: '2025-04-07T09:14:00Z' }
        ]
    },
    {
        id: 'grp1',
        name: 'Frontend Fanatics',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=21',
        lastMessage: 'We’re moving to Tailwind 4 next week!',
        timestamp: '2025-04-07T10:24:00Z',
        history: [
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' }
        ]
    },
    {
        id: 'grp2',
        name: 'Backend Bosses',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=22',
        lastMessage: 'Redis cache flushed accidentally 💀',
        timestamp: '2025-04-07T09:12:00Z',
        history: [
            { sender: 'Liam', receiver: 'Backend Bosses', message: 'Redis cache flushed accidentally 💀', time: '2025-04-07T09:12:00Z' },
            { sender: 'you', receiver: 'Backend Bosses', message: 'Broooo... not again 😩', time: '2025-04-07T09:13:00Z' },
            { sender: 'Raj', receiver: 'Backend Bosses', gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif', time: '2025-04-07T09:14:00Z' }
        ]
    },
    {
        id: 'grp1',
        name: 'Frontend Fanatics',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=21',
        lastMessage: 'We’re moving to Tailwind 4 next week!',
        timestamp: '2025-04-07T10:24:00Z',
        history: [
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks 🔥', time: '2025-04-07T10:20:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', message: 'We’re moving to Tailwind 4 next week!', time: '2025-04-07T10:24:00Z' },
            { sender: 'Emily', receiver: 'Frontend Fanatics', image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg', time: '2025-04-07T10:25:00Z' }
        ]
    },
    {
        id: 'grp2',
        name: 'Backend Bosses',
        online: true,
        type: 'group',
        avatar: 'https://i.pravatar.cc/150?img=22',
        lastMessage: 'Redis cache flushed accidentally 💀',
        timestamp: '2025-04-07T09:12:00Z',
        history: [
            { sender: 'Liam', receiver: 'Backend Bosses', message: 'Redis cache flushed accidentally 💀', time: '2025-04-07T09:12:00Z' },
            { sender: 'you', receiver: 'Backend Bosses', message: 'Broooo... not again 😩', time: '2025-04-07T09:13:00Z' },
            { sender: 'Raj', receiver: 'Backend Bosses', gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif', time: '2025-04-07T09:14:00Z' }
        ]
    },
];



export default function page() {
    const [selecteChat, setSelectedChat] = useState();
    const [userId, setUserId] = useState("")


  

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        setUserId(user_id);
        sendMessages()
    }, [])

    return (
        <>
            <div className='flex absolute top-[50px] lg:top-[49px] md:top-0 w-full '>
                {/* chat list; */}
                <div className={`${selecteChat ? "hidden lg:flex transition-all" : ""} w-full lg:w-[300px] border border-r-gray-200 bg-white lg:h-screen lg:z-50 `}>
                    <div className=' fixed bg-white py-2 px-5 right-0 left-0 top-[49px] z-50 border border-gray-200 md:fixed md:left-[100px] md:right-0 md:py-3 lg:left-[100px] lg:w-[300px]'>
                        <div className=' border flex rounded-md px-2 border-gray-300 '>
                            <input type="search" placeholder='Search...' className='p-1 bg-transparent outline-none flex-1' />
                            <Search className=' w-7 h-7 my-auto text-gray-600' />
                        </div>
                    </div>

                    <ScrollArea className=' absolute top-14 pb-20  md:top-14 md:absolute w-full md:pb-24 md:h-screen lg:h-screen lg:w-[300px] lg:top-2 lg:z-50'>
                        <div className="px-1 py-2">
                            {
                                chatList.map((item, index) => (
                                    <li onClick={() => setSelectedChat(item)} key={index} className='list-none hover:bg-gray-200 p-3 rounded-sm flex gap-2'>
                                        <div className='relative p-1'>
                                            <Avatar className="">
                                                <AvatarImage src={item.avatar} />
                                            </Avatar>
                                            {
                                                item.online ?
                                                    <span className='w-[10px] h-[10px]  absolute bg-green-400 rounded-full right-1 bottom-1' ></span>
                                                    : ""
                                            }
                                        </div>
                                        <div className="text-sm flex-1">
                                            <h1 className=' font-medium text-gray-800'>{item.name}</h1>
                                            <span className='text-gray-400 line-clamp-1'>{item.lastMessage}</span>
                                        </div>
                                        {
                                            item.online ? <small className='text-green-500'>online</small> : ""
                                        }
                                    </li>
                                ))
                            }
                        </div>
                    </ScrollArea>
                </div>


                {/* chat section */}

                <div className={`${!selecteChat ? "hidden lg:flex" : " block lg:block"}  relative w-full `}>

                    <div className=" fixed inset-0 bg-[url('https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-28.svg')] bg-contain opacity-8 z-0"></div>
                    {
                        selecteChat && (
                            <>
                                <div className="fixed z-50 right-0 left-0 md:left-[100px] flex  border bg-white border-b-gray-200 p-2 gap-3 transition-all lg:left-[400px] lg:right-0 lg:top-[49px]">
                                    <ArrowLeft onClick={() => setSelectedChat()} className='lg:hidden my-auto ' />
                                    <Avatar className="">
                                        <AvatarImage src={selecteChat?.avatar} />
                                    </Avatar>
                                    <div className='p-0 relative '>
                                        <h1 className="text-gray-800">{selecteChat?.name}</h1>
                                        {
                                            selecteChat?.online ? <small className='text-green-500 absolute top-4'>online</small> : ""
                                        }
                                    </div>
                                </div>

                                {/* chat pannel */}
                                <ScrollArea className='absolute top-[49px] left-0 right-0  flex flex-col pb-10  md:pb-40 lg:pb-40 h-screen container mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto md:mx-auto w-[95%] md:w-[95%]  lg:w-[95%] lg:top-0'>
                                    <div className=' py-11'>
                                        {
                                            selecteChat?.history.map((chat, index) => (
                                                chat?.sender === "you" ?
                                                    (
                                                        <div key={index} className='mt-2 flex justify-end'>
                                                            <div className='flex gap-1'>
                                                                <section className=' bg-purple-600  shadow max-w-2xs min-w-3.5 p-2 rounded-tl-lg rounded-bl-lg rounded-br-lg'>
                                                                    <span className='text-white'>{chat?.message}</span>
                                                                </section>
                                                                <Avatar>
                                                                    <AvatarImage src={selecteChat?.avatar} />
                                                                </Avatar>

                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div key={index} className='flex justify-start'>
                                                            <div className='flex gap-1'>
                                                                <Avatar>
                                                                    <AvatarImage src={selecteChat?.avatar} />
                                                                </Avatar>
                                                                <section className='mt-2 z-30 bg-gray-100 border border-gray-200  w-auto  p-2 rounded-tr-lg rounded-br-lg rounded-bl-lg'>
                                                                    {
                                                                        chat.image ?
                                                                            chat.gif ? (
                                                                                <Image
                                                                                    src={chat?.gif}
                                                                                    width={100}
                                                                                    height={100}
                                                                                    alt='chatimages'
                                                                                    quality={100}
                                                                                    loading='lazy'
                                                                                    className='w-[200px] md:w-[300px] lg:w-[300px]'
                                                                                />
                                                                            ) :
                                                                                (
                                                                                    <Image
                                                                                        src={chat?.image}
                                                                                        width={100}
                                                                                        height={100}
                                                                                        alt='chatimages'
                                                                                        quality={100}
                                                                                        loading='lazy'
                                                                                        className='w-[200px] md:w-[300px] lg:w-[300px]'
                                                                                    />
                                                                                )
                                                                            :
                                                                            (<span className=''>{chat.message}</span>)
                                                                    }
                                                                </section>
                                                            </div>
                                                        </div>
                                                    )
                                            ))
                                        }
                                    </div>
                                </ScrollArea>

                                {/* chat section footer */}
                                <div className='z-50 fixed bottom-0  p-2 px-2 md:px-7 lg:px-7 bg-white right-0 left-0 md:left-[100px] border-t-gray-200  border lg:left-[400px] lg:right-0'>
                                    <section className='flex pb-1 gap-2'>
                                        <div className='flex my-auto gap-3'>
                                            <Smile className='text-gray-700 hover:text-purple-700 hidden' />
                                            <Paperclip className='text-gray-700 hover:text-purple-700' />
                                        </div>
                                        <div className='bg-white border flex-1 border-gray-200 rounded-md my-auto'>
                                            <input placeholder='Type message here...' type="text" className='outline-none p-2 ' />
                                        </div>
                                        <div className=' my-auto text-gray-700 transition-all  hover:bg-gray-200 p-2 hover:rounded-full '>
                                            <Send />
                                        </div>
                                    </section>
                                </div>
                            </>
                        )
                    }
                </div>

            </div>
        </>
    )
}
