'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { CircleAlert, Eye, EyeClosed, RotateCw, UserCheck } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { z } from 'zod';

export default function page(props) {
    const [showPassword, setShowPassword] = useState(false)
    const [formdata, setFormData] = useState({ fullname: "", email: "", mobileno: "", password: "" });
    const [errors, setErrors] = useState();
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter()

    const ShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const formData = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const UserValidation = z.object({
        fullname: z.string().min(3, "minimum 3 charecter is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Invalid password"),
        mobileno: z.string().max(10, "Invalid mobile no").min(10, "Invalid mobile no")
    })

    const signUp = async (e) => {
        e.preventDefault()
        const result = UserValidation.safeParse(formdata);
        const error = result.error?.format();
        setErrors(error);
        setLoader(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/signup`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }

            );

            if (response.data?.message) {
                setSuccess(response?.data?.message);
                setErrorMsg("")
                router.push('./signin')
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
            <div className=' flex flex-col'>
                <div className='p-10 container h-screen mx-auto w-full lg:w-[1024px] flex'>
                    <div className=' relative flex flex-col bg-white border border-gray-200 shadow rounded-lg w-full lg:w-[45%] my-auto mx-auto'>
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
                                width={100}
                                height={100}
                                src='/accets/AClogo.png'
                            />
                        </section>
                        <section className=''>
                            <h1 className='text-center text-xl font-semibold'>ArthpurnConsaltants</h1>
                            <h1 className='text-center text-2xl mt-1 font-semibold'>Sign up</h1>
                        </section>
                        <div className='p-5 grid gap-2'>
                            <form onSubmit={signUp} className=" flex flex-col gap-3 ">

                                <div className='flex flex-col'>
                                    <label className=''>Full name</label>
                                    <input onChange={formData} type="text" name='fullname' placeholder="full name" className={`outline-none active:bg-white border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />
                                    {errors ? <span className='text-red-600'>{errors.fullname?._errors}</span> : ""}
                                </div>
                                <div className='flex flex-col'>
                                    <label className=''>Email</label>
                                    <input onChange={formData} type="email" name='email' placeholder='email' className={`outline-none border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />
                                    {errors ? <span className='text-red-600'>{errors.email?._errors}</span> : ""}
                                </div>
                                <div className='flex flex-col'>
                                    <label className=''>Mobile no</label>
                                    <input onChange={formData} type="tel" name='mobileno' placeholder='mobile no' className={`outline-none border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />
                                    {errors ? <span className='text-red-600'>{errors.mobileno?._errors}</span> : ""}
                                </div>
                                <div className='flex flex-col relative'>
                                    <label className=''>Password</label>
                                    <input onChange={formData} type={showPassword ? "text" : "password"} name='password' placeholder='create password' className={`outline-none border border-blue-100 rounded-sm p-2 ${errors ? "border-red-500" : ""}`} />
                                    {
                                        showPassword ? <Eye className='w-4 h-4 absolute top-9 right-3 z-20' onClick={ShowPassword} /> : <EyeClosed className='w-4 h-4 absolute top-9 right-3 z-20 ' onClick={ShowPassword} />
                                    }
                                    {errors ? <span className='text-red-600'>{errors.password?._errors}</span> : ""}

                                </div>
                                <Button type="submit"  variant='secondary' className='mt-5'>
                                    {
                                        loader ? (
                                            <RotateCw className=' animate-spin transition-all w-10 h-10' />
                                        ) :
                                            "Sign up"
                                    }
                                </Button>
                                <small className='text-center'>Already have an account <Link href="./signin" className='text-blue-600'>signin</Link></small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
