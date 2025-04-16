'use client'

import { Button } from '@/components/ui/button';
import { CircleAlert, Eye, EyeClosed, RotateCw, UserCheck } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signin(props) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();


    const ShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const UserValidation = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Invalid password"),

    })

    const signIn = async (e) => {
        e.preventDefault()
        const result = UserValidation.safeParse({ email, password });
        const error = result.error?.format();
        setErrors(error);
        setLoader(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }

            );

            if (response.data?.message) {
                setSuccess(response?.data?.message)
                setErrorMsg("")
                router.push('../dashboard')
            }
            console.log(response.data);

        } catch (error) {
            setErrorMsg(error.response?.data?.error)
            setSuccess("")
        } finally {
            setLoader(false);

        }

    }


    return (
        <>
            <div className=''>
                <div className='p-10 container h-screen mx-auto w-full  lg:w-[1024px] flex'>
                    <div className='relative flex flex-col bg-white border border-gray-200 shadow rounded-lg w-full md:w-[60%] lg:w-[45%] my-auto mx-auto'>
                        <div className="h-10 mx-auto absolute top-3 right-5 left-5">
                            {
                                success && (
                                    <Alert variant={'default'}>
                                        <UserCheck className="h-4 w-4" />
                                        <AlertTitle>{success}</AlertTitle>
                                    </Alert>
                                )
                            }
                            {
                                errorMsg && (
                                    <Alert variant={'warrning'} >
                                        <CircleAlert className="h-4 w-4" />
                                        <AlertTitle> {errorMsg}</AlertTitle>
                                    </Alert>
                                )
                            }
                        </div>

                        <section className='mx-auto mt-4'>
                            <Image
                                alt='logo'
                                className='w-10 h-10'
                                width={200}
                                height={200}
                                quality={100}
                                src='/accets/AClogo.png'
                            />
                        </section>
                        <section className=''>
                            <h1 className='text-center text-xl font-semibold'>ArthpurnConsaltants</h1>
                            <h1 className='text-center text-2xl mt-2 font-semibold'>Sign in</h1>
                        </section>
                        <div className='p-5 grid gap-2'>

                            <form onSubmit={signIn} className='flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label className=''>Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='email' className={`outline-none border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />

                                    {errors ? <span className='text-red-600'>{errors.email?._errors}</span> : ""}
                                </div>

                                <div className='flex flex-col relative'>
                                    <label className=''>Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} name='password' placeholder='create password' className={`outline-none border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />
                                    {
                                        showPassword ? <Eye className='w-4 h-4 absolute top-9 right-3 z-20' onClick={ShowPassword} /> : <EyeClosed className='w-4 h-4 absolute top-9 right-3 z-20 ' onClick={ShowPassword} />
                                    }
                                    {errors ? <span className='text-red-600'>{errors.password?._errors}</span> : ""}
                                    <small className='flex mt-1'>
                                        <input type="checkbox" required className='bg-white my-auto mx-2' />
                                        Accept term and Conditions
                                    </small>
                                </div>
                                <Button type="submit" variant='secondary' className='mt-5 w-full'>
                                    {
                                        loader ? (
                                            <RotateCw className=' animate-spin transition-all w-10 h-10' />
                                        ) :
                                            "Sign in"
                                    }
                                </Button>
                                <div className='grid lg:flex md:flex'>
                                    <small className=' text-center w-full'>Already have an account <Link href="./signup" className='text-blue-600'>signup</Link></small>
                                    <small className=' text-center w-full'>Forgot password <Link href="./reset-password" className='text-blue-600'>Reset</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
