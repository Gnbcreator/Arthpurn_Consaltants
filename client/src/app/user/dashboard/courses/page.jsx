'use client'
import React, { useState } from 'react'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Filter, ListFilter, Search, X } from 'lucide-react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const course = [
    {
        title: "BIG Changes Are Coming To Finance In 2025",
        description: "An in-depth analysis of the upcoming transformations in the financial sector for 2025.",
        url: "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/vc_vp9/dog.webm",
        thumbnail: "https://img.youtube.com/vi/N1TxnEjbuIw/maxresdefault.jpg"
    },
    {
        title: "The 9 Best Stocks to Buy Now in April (2025)",
        description: "A comprehensive guide to the top nine stock picks for April 2025.",
        url: "https://www.youtube.com/watch?v=_Fmkx3AOzM8",
        thumbnail: "https://img.youtube.com/vi/_Fmkx3AOzM8/maxresdefault.jpg"
    },
    {
        title: "Top Stock Picks for Week of April 7, 2025",
        description: "Expert recommendations on the best stocks to consider for the week starting April 7, 2025.",
        url: "https://www.youtube.com/watch?v=bYBoEuO5HU8",
        thumbnail: "https://img.youtube.com/vi/bYBoEuO5HU8/maxresdefault.jpg"
    },
    {
        title: "Market commentary with Absa CIB - 8 April 2025",
        description: "Insights and analysis on the latest market trends as of April 8, 2025.",
        url: "https://www.youtube.com/watch?v=j1VL7RRbo6k",
        thumbnail: "https://img.youtube.com/vi/j1VL7RRbo6k/maxresdefault.jpg"
    },
    {
        title: "5 Stocks to BUY NOW in April 2025",
        description: "A curated list of five stocks that present promising investment opportunities this month.",
        url: "https://www.youtube.com/watch?v=xQam690Uofc",
        thumbnail: "https://img.youtube.com/vi/xQam690Uofc/maxresdefault.jpg"
    },
    {
        title: "I'm Buying These 3 Best Stocks In April 2025",
        description: "An investor shares their top three stock picks for April 2025 and the rationale behind each choice.",
        url: "https://www.youtube.com/watch?v=QuI3Vqzr_N4",
        thumbnail: "https://img.youtube.com/vi/QuI3Vqzr_N4/maxresdefault.jpg"
    },
    {
        title: "Market Analysis: Best Offense Starts With A Good Defense",
        description: "A discussion on defensive investment strategies in the current market environment.",
        url: "https://www.youtube.com/watch?v=k7qADG0Upkk",
        thumbnail: "https://img.youtube.com/vi/k7qADG0Upkk/maxresdefault.jpg"
    },
    {
        title: "Top 10 Stock Charts for April 2025 – Big Breakouts Ahead?",
        description: "An analysis of ten stock charts indicating potential breakout opportunities this month.",
        url: "https://www.youtube.com/watch?v=GS3ESYaCPkQ",
        thumbnail: "https://img.youtube.com/vi/GS3ESYaCPkQ/maxresdefault.jpg"
    },
    {
        title: "Trump's Market Crash | Trading 212 Portfolio Update April 2025",
        description: "An update on the Trading 212 portfolio in light of recent market movements influenced by political events.",
        url: "https://www.youtube.com/watch?v=9bODrKpvHwo",
        thumbnail: "https://img.youtube.com/vi/9bODrKpvHwo/maxresdefault.jpg"
    },
    {
        title: "April 2025 Market Snapshot - Lance Martin Presents",
        description: "A snapshot of the market's performance and key indicators as of April 2025.",
        url: "https://www.youtube.com/watch?v=NSgaETjhcoE",
        thumbnail: "https://img.youtube.com/vi/NSgaETjhcoE/maxresdefault.jpg"
    },
    {
        title: "Trump just FLIPPED the Stock Market - I'm Buying These Stocks",
        description: "An analysis of recent political events and their impact on stock market investments.",
        url: "https://www.youtube.com/watch?v=NKLsI_DQHPE",
        thumbnail: "https://img.youtube.com/vi/NKLsI_DQHPE/maxresdefault.jpg"
    },
    {
        title: "Market Strategy Weekly: April 4, 2025",
        description: "Weekly market strategy insights and recommendations for investors.",
        url: "https://www.youtube.com/watch?v=lMEtENduZ7k",
        thumbnail: "https://img.youtube.com/vi/lMEtENduZ7k/maxresdefault.jpg"
    },
    {
        title: "Stocks To Buy Now | #GrasimIndustriesLtd | 9th April 2025",
        description: "A focused analysis on Grasim Industries Ltd and its potential as an investment.",
        url: "https://www.youtube.com/watch?v=SK1ePcuX2OI",
        thumbnail: "https://img.youtube.com/vi/SK1ePcuX2OI/maxresdefault.jpg"
    },
    {
        title: "5 Stocks to Buy Now‼️April 2025",
        description: "An investor's guide to five stocks worth considering in April 2025.",
        url: "https://www.youtube.com/watch?v=Lq2oBAEZ1Os",
        thumbnail: "https://img.youtube.com/vi/Lq2oBAEZ1Os/maxresdefault.jpg"
    },
    {
        title: "Sinking Funds Update April 2025 | No Spend Year",
        description: "An update on sinking funds and budgeting strategies during a no-spend year.",
        url: "https://www.youtube.com/watch?v=PHlx1g1YIVA",
        thumbnail: "https://img.youtube.com/vi/PHlx1g1YIVA/maxresdefault.jpg"
    },
    {
        title: "Worried about the stock market? GET READY..",
        description: "Preparatory advice for investors concerned about potential market downturns.",
        url: "https://www.youtube.com/watch?v=WgUdkYOmlCY",
        thumbnail: "https://img.youtube.com/vi/WgUdkYOmlCY/maxresdefault.jpg"
    },
    {
        title: "Top Stock Picks For April 2025: Expert Buy, Hold, Sell Recommendations",
        description: "Expert opinions on which stocks to buy, hold, or sell this month.",
        url: "https://www.youtube.com/watch?v=Ez5lzt3Pp8U",
        thumbnail: "https://img.youtube.com/vi/Ez5lzt3Pp8U/maxresdefault.jpg"
    },

];


export default function page() {
    const [player, setPlayVideo] = useState();
    return (
        <>
            <div className='flex relative w-full '>
                <div className=' fixed   top-[50px] lg:absolute md:absolute md:top-0 lg:top-0 md p-2  z-50 bg-white right-0 left-0 flex '>
                    <div className='flex-1'>
                        <div className='border border-gray-300 rounded-lg flex gap-2'>
                            <input type="search" className='p-1 md:p-2 lg:p-2   w-full' placeholder='search...' />
                            <Search className='my-auto mr-3 text-gray-700' />
                        </div>
                    </div>
                    <div className='mx-2 md:w-[10%] lg:w-[10%] flex md:gap-2 lg:gap-2'>
                        <ListFilter className=' w-5 h-5 my-auto md:ml-3 lg:ml-3' />
                        <label className='my-auto tracking-tighter'>Sort</label>
                    </div>
                </div>
                <div className='fixed md:absolute lg:absolute right-0 left-0 top-24   md:top-14 p-2  lg:top-14'>
                    <ScrollArea className="h-screen pb-40 md:pb-28 lg:pb-28">
                        <div className='grid gap-2 md:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12'>
                            {
                                course.map((item, index) => (
                                    <div key={index} className=' md:col-span-3 lg:col-span-4 xl:col-span-3' onClick={() => setPlayVideo(item.url)}>
                                        <AspectRatio ratio={16 / 9} >
                                            <Image
                                                alt='thumbnil'
                                                width={200}
                                                height={200}
                                                quality={100}
                                                src={item.thumbnail}
                                                className='w-full rounded-sm'
                                            />
                                        </AspectRatio>
                                        <div>
                                            <p className=' font-medium'>{item.title}</p>
                                            <p className=' line-clamp-2'>{item.description}</p>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </ScrollArea>
                </div>

                {/* Video player */}

                {
                    player && (
                        <div className='absolute lg:left-0 lg:right-0 flex w-full  h-screen backdrop-blur-lg'>
                            <div className=' relative mx-auto my-auto'>
                                <ReactPlayer
                                    url={player}
                                    volume={true}
                                    controls
                                />
                                 <X className='text-white absolute top-1 right-1' onClick={()=>setPlayVideo()}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
