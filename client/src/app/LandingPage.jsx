'use client'
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Navbar from './componets/Navbar';
import { Particles } from '@/components/magicui/particles';
import { useTheme } from 'next-themes';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { ChartLine, FileQuestion, LineChart, GraduationCap, BrainCircuit, BookOpenText, ShieldCheck, BookOpen, Cpu, Globe, Layers, TrendingUp, Activity } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Footer from './componets/Footer';
import Link from 'next/link';


const features = [
    {
        label: "Technical Analysis and Mastery",
        icon: <LineChart className='text-purple-500' />,
        description: "Learn advanced charting techniques, indicators, and patterns to make informed trading decisions."
    },
    {
        label: "Fundamental Analysis",
        icon: <TrendingUp className='text-purple-500' />,
        description: "Analyze financial statements, market trends, and economic factors to evaluate asset value."
    },
    {
        label: "Risk Management Strategies",
        icon: <ShieldCheck className='text-purple-500' />,
        description: "Master capital preservation techniques, stop-loss strategies, and position sizing to manage risks effectively."
    },
    {
        label: "Algorithmic and AI-Based Trading",
        icon: <Cpu className='text-purple-500' />,
        description: "Utilize AI-driven strategies, automation, and quantitative analysis to optimize trading performance."
    },
    {
        label: "Live Market Case Studies",
        icon: <Activity className='text-purple-500' />,
        description: "Analyze real-time market movements and apply theoretical knowledge to practical scenarios."
    },
    {
        label: "Options, Futures, and Derivative Trading",
        icon: <Layers className='text-purple-500' />,
        description: "Learn to trade options, futures, and other derivatives for hedging and speculative opportunities."
    },
    {
        label: "Crypto and Forex Trading",
        icon: <Globe className='text-purple-500' />,
        description: "Understand the dynamics of cryptocurrency and forex markets, and develop strategies for profitability."
    }
];

const whyChooseUs = [
    {
        title: "Expert-Led Training",
        image: "https://plus.unsplash.com/premium_photo-1661274038674-4af6db432393?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fEV4cGVydCUyMExlZCUyMFRyYWluaW5nJTIwaW4lMjBzaGFyZSUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3DD",
        description: "Learn from seasoned traders and financial experts with years of real-world market experience."
    },
    {
        title: "Proven Strategies",
        image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9",
        description: "Access time-tested trading strategies, market insights, and risk management techniques."
    },
    {
        title: "Advanced Risk Management",
        image: "https://plus.unsplash.com/premium_photo-1661370293412-2770dd5c4b02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFkdmFuY2VkJTIwUmlzayUyME1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D",
        description: "We emphasize safe trading practices with effective risk management strategies to protect your capital."
    },
    {
        title: "Real-Time Market Insights",
        image: "https://images.unsplash.com/photo-1629963918958-1b62cfe3fe92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFJlYWwlMjBUaW1lJTIwTWFya2V0JTIwSW5zaWdodHN8ZW58MHx8MHx8fDA%3D",
        description: "Stay ahead with live market case studies, expert analysis, and up-to-date financial trends."
    },
    {
        title: "Community Support",
        image: "https://plus.unsplash.com/premium_photo-1723575796708-7a6ea3475d4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tdW5pdHklMjBzdXBwb3J0JTIwaW4lMjBzaGFyZSUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D",
        description: "Join a thriving community of traders, share insights, and grow together with interactive discussions."
    },
    {
        title: "100% Practical Learning",
        image: "https://plus.unsplash.com/premium_photo-1700675175407-53c53101cbb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNoYXJlJTIwbWFya2V0JTIwMTAwJTI1JTIwUHJhY3RpY2FsJTIwTGVhcm5pbmd8ZW58MHx8MHx8fDA%3D",
        description: "No fluff, no theory overload just hands-on training with real-world trading applications."
    }
]
export default function LandingPage(props) {

    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("black");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);
    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Navbar at the top */}
                <header>
                    <Navbar />
                </header>

                {/* Main content takes up all available space */}
                <main className="flex-grow">
                    <div className="bg-gray-100 relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={100}
                            ease={100}
                            color={color}
                            refresh
                        />

                        <div className="h-screen flex flex-col p-[200px] z-10">

                            <AnimatedShinyText className="border w-[60%] lg:w-fit border-gray-200 rounded-full mx-auto inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                <span>✨ Arthpurn Consultants</span>
                            </AnimatedShinyText>

                            <h1 className="animate-text-focus-in-normal text-4xl w-[400px] lg:w-full lg:text-6xl font-bold text-center bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                                Master the Art of Trading
                            </h1>
                            <h1 className="lg:text-6xl font-bold text-center text-4xl">& Market Analysis</h1>



                            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3 w-full relative items-center justify-center overflow-hidden">
                                <AnimatedShinyText className="w-full inline-flex border border-gray-400 rounded-full items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                    <ChartLine className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                    <span> Introducing Magic UI</span>
                                </AnimatedShinyText>
                                <AnimatedShinyText className="inline-flex w-full border border-gray-400 rounded-full items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                    <BrainCircuit className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                    <span> Advanced Trading Strategy</span>
                                </AnimatedShinyText>
                            </div>

                            <div className="mt-5 mx-auto">
                                <Link href={"/user/auth/signup"}>
                                    <Button variant="secondary" className="bg-blue-500 w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto lg:w-[1024px] py-10 px-3">
                        <h1 className="text-2xl text-center font-semibold">Details about courses</h1>
                        <p className="text-center">
                            Our course is designed to transform you into a skilled trader by providing in-depth knowledge, practical strategies, and real-world case studies. Whether you are a beginner or an experienced trader, you will gain the confidence to navigate the financial markets with precision.
                        </p>

                        <div className="mt-10">
                            <h1 className="text-2xl flex font-semibold">
                                <BookOpen className="my-auto text-blue " />
                                <span className="mx-2">Details about courses</span>
                            </h1>

                            <section className="grid grid-col-1 lg:gap-5 lg:grid lg:grid-cols-12 gap-1 mt-5">
                                {features.map((item, index) => (
                                    <Card key={index} className="hover:scale-105 transition-all bg-white lg:col-span-4">
                                        <CardHeader>
                                            <CardTitle className="text-black flex">
                                                {item.icon}
                                                <span className="mx-2">{item.label}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-black">{item.description}</CardContent>
                                    </Card>
                                ))}
                            </section>
                        </div>

                        <div className="mt-10">
                            <h1 className="text-2xl flex font-semibold">
                                <FileQuestion className="my-auto" />
                                <span className="mx-2">Why Choose Us?</span>
                            </h1>

                            <section className="grid gap-5 lg:gap-5 lg:grid lg:grid-cols-12 mt-5">
                                {whyChooseUs.map((item, index) => (
                                    <Card key={index} className="hover:scale-105 transition-all bg-white lg:col-span-4">
                                        <CardHeader>
                                            <Image
                                                width={200}
                                                height={200}
                                                quality={100}
                                                alt="card_image"
                                                src={item.image}
                                                className="w-full rounded-xl"
                                            />
                                            <CardTitle>
                                                <span className="text-black">{item.title}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-black">
                                            <p className="text-base">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </section>
                        </div>

                        {/* for plans sections
                          */}
                        <div>

                        </div>
                    </div>

                </main>

                {/* Footer always at the bottom */}
                <footer className="mt-auto w-full">
                    <Footer />
                </footer>
            </div>

        </>
    );
}

