'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowBigLeft, ChevronLeft, ChevronsLeft, Dot, Phone, Plus, Search, Send, Smile, Video } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
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
            { sender: 'you', receiver: 'Frontend Fanatics', message: 'Tailwind 4 release looks asdfasdfasdfasdfasdfasdfasdfa asdfasdf 🔥', time: '2025-04-07T10:20:00Z' },
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



export default function chats() {
    const [chats, setChats] = useState([]);
    const [file, setFile] = useState();
    const fileInputref = useRef(null)

    const handleInput = () => {
        if (fileInputref.current) {
            fileInputref.current.click()
        }
    }

   

    const handleFileInput = (e) => {
        setFile(e.target.files[0])
    }
    
    useEffect(()=>{
        sendMessages()
    })

    return (
        <>
            <div className='bg-gray-100 w-full  flex h-screen '>
                <aside className={`border h-screen z-4 border-r-gray-300  w-full  lg:w-[300px] xl:w-[350px] 2xl:w-[350px] ${!chats.length ? "lg:block" : "hidden lg:grid"} `}>

                    <div className={` bg-white p-2  translate-x-1 md:translate-x-0 ${!chats.length ? "" : "hidden lg:grid "}`}>
                        <div className='flex border border-gray-200 rounded-lg bg-white '>
                            <input type="search" className='font outline-none flex-1 p-[5px] bg-transparent' />
                            <Search className='my-auto mx-2 text-gray-700 w-6 h-6' />
                        </div>
                    </div>
                    <ScrollArea className={`h-screen pb-24 md:pb-24 lg:pb-24 translate-x-1 md:translate-x-0 ${!chats.length ? " lg:translate-x-1" : "-translate-x-full lg:translate-x-1 md:-translate-x-full"} `}>
                        <div>
                            <ul>
                                {
                                    chatList.map((item, index) => (
                                        <li onClick={() => setChats([item])} key={index} className='px-3 py-3 hover:bg-gray-200 hover:rounded-lg hover:transition-all flex'>
                                            <div className='flex gap-2 relative flex-1'>
                                                <Avatar className="my-auto w-10 h-10 ">
                                                    <AvatarImage src={item.avatar} />
                                                </Avatar>
                                                {item.online && (<Dot className='z-50 w-14 h-14 top-3 left-1  text-red-500 absolute' />)}
                                                <section className='my-auto'>
                                                    <h1 className='text-gray-700'>{item.name}</h1>
                                                    <p className='text-gray-400 tracking-tight line-clamp-1'>{item.lastMessage}</p>
                                                </section>
                                            </div>
                                            {
                                                item.online && <small className='text-green-600'>online</small>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </ScrollArea>

                </aside>

                {/* message and chat area */}
                {
                    chats && (
                        <div className={`h-screen z-4 relative flex-1  `}>
                            {
                                chats?.map((item, index) => (
                                    <div className='relative h-screen' key={index}>
                                        <div className='flex justify-between bg-white w-full'>
                                            <div className='my-auto flex gap-2 h-[53px] px-2 '>
                                                <ChevronLeft onClick={() => setChats("")} className='text-gray-600 my-auto hover:transition-all hover:bg-gray-200 hover:rounded-full' />
                                                <Avatar className="my-auto w-7 h-7 ">
                                                    <AvatarImage src={item?.avatar} />
                                                </Avatar>
                                                <section className='my-auto'>
                                                    <h1 className='text-gray-700'>{item.name}</h1>
                                                    {item?.online && <p className=' text-green-600 tracking-tight line-clamp-1 mt-[-10px]'>online</p>}
                                                </section>

                                            </div>
                                            <div className='my-auto flex gap-3 mx-5'>
                                                <Button variant="outline" >
                                                    <Video className='w-10 h-10' />
                                                </Button>
                                                <Button variant="outline">
                                                    <Phone />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* chat section */}
                                        <ScrollArea className="pb-10 h-screen">
                                            <div className='p-4 container mx-auto   pb-[150px]'>
                                                {item.history.map((chat, index) => (
                                                    <div key={index} className={` flex  gap-y-5 w-full`}>
                                                        <section className={`${chat.sender == "you" ? "  flex-row-reverse" : " "} gap-2 flex w-full my-3`}>
                                                            <Avatar className={`${chat.sender == "you" ? "justify-end" : ""}`}>
                                                                <AvatarImage src={item.avatar} />
                                                            </Avatar>

                                                            {
                                                                chat.image || chat.gif ?


                                                                    <div className={`${chat.sender == "you" ? "rounded-tl-lg rounded-br-lg rounded-bl-lg rounded-tr-none " : " rounded-tr-lg rounded-br-lg rounded-bl-lg"} relative  p-1 bg-purple-200`}>
                                                                        <Image alt='chat' src={chat.image || chat?.gif} width={100} height={100} className='rounded-lg lg:w-[200px]  lg:h-auto' />
                                                                        <small className={`${chat.sender == "you" ? " left-0" : "right-0 "} absolute text-green-600`}>
                                                                            {
                                                                                new Date(chat.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
                                                                            }
                                                                        </small>
                                                                    </div>
                                                                    :
                                                                    <div className={`${chat.sender == "you" ? "rounded-tl-lg rounded-br-lg rounded-bl-lg rounded-tr-none " : " rounded-tr-lg rounded-br-lg rounded-bl-lg"} text-wrap relative h-auto lg:text-xs text-white bg-purple-500 rounded-r lg:max-w-[200px] xl:max-w-[350px] 2xl:max-w-[350px]`}>
                                                                        <h1 className='p-2 text-wrap'>{chat.message}</h1>
                                                                        <small className={`${chat.sender == "you" ? " left-0" : "right-0 "} absolute text-green-600`}>
                                                                            {
                                                                                new Date(chat.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
                                                                            }
                                                                        </small>
                                                                    </div>
                                                            }


                                                        </section>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </ScrollArea>
                                        {/*chat footer */}
                                        <div className='bg-white gap-3  px-7 flex h-18 absolute bottom-10 w-full'>
                                            {/* <Smile className='text-gray-700 transition-all my-auto hover:rounded-full hover:bg-gray-200' /> */}
                                            <div className='my-auto  relative'>
                                                <input onChange={handleFileInput} ref={fileInputref} type='file' className='hidden border w-8 h-8 border-gray-700 rounded-full' />
                                                <Plus onClick={handleInput} className=' text-gray-700 transition-all hover:rounded-full hover:bg-gray-200' />
                                            </div>
                                            <div className='my-auto flex flex-1 border border-gray-400 rounded-2xl'>
                                                <input type="text" className=' outline-none p-2 flex-1' />
                                                <Send className='my-auto mx-5 text-gray-700 ' />
                                            </div>
                                        </div>
                                    </div>

                                ))

                            }

                        </div>
                    )
                }
            </div>
        </>
    )
}
