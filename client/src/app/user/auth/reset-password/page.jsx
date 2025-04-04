'use client'

import { Button } from '@/components/ui/button';
import { KeyRound, RotateCw ,ShieldAlert} from 'lucide-react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isEmailSend, setIsEmailSend] = useState(false)
    const [success, setSuccess] = useState('')
    const router = useRouter();

    const sendOtp = async (e) => {

        setLoader(true);

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/send-otp`,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response.data?.emailResponse?.accepted) {
                setIsEmailSend(true)
               
            }

        } catch (error) {
            setErrorMsg(error.response?.data?.error)
        } finally {
            setLoader(false);

        }

    }


    const resetPassword = async (e) => {

        setLoader(true);

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/reset-password`,
                { email, otp, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response) {
            
                // setSuccess(response?.message)
                console.log(response)
                router.push('./signin')
            }


        } catch (error) {
            setErrorMsg(error.response?.data?.error);
          console.log(error.response?.data?.error)
        } finally {
            setLoader(false);

        }

    }



    return (
        <>
            <div className=''>
                <div className='p-10 container h-screen mx-auto w-full  lg:w-[1024px] flex'>
                    <div className='relative flex flex-col bg-white border border-gray-200 shadow rounded-lg w-full md:w-[60%] lg:w-[45%] my-auto mx-auto'>
                        <div className=' absolute top-4 right-5 left-5 '>
                            {
                                errorMsg && (
                                    <Alert variant={'warrning'}>
                                        <ShieldAlert />
                                        <AlertTitle>{errorMsg}</AlertTitle>
                                    </Alert>
                                )
                            },
                            {
                                success && (
                                    <Alert>
                                        <KeyRound />
                                        <AlertTitle>{success}</AlertTitle>
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
                        <section className="">
                            <h1 className="text-center text-xl font-semibold">Arthpurn Consultants</h1>
                            <h1 className="text-center text-xl mt-2 font-semibold">Reset Password</h1>
                            <p className="text-center text-sm mt-2 p-5">
                                An OTP has been sent to your registered email address to proceed with resetting your password.
                            </p>
                        </section>
                        <div className='p-5 grid gap-2'>
                            {
                                !isEmailSend && (
                                    <div className='flex flex-col'>
                                        <label className=''>Email</label>
                                        <input required onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='email' className={`outline-none border border-blue-100 rounded-sm p-2 `} />
                                    </div>
                                )

                            }
                            {
                                isEmailSend && (
                                    <>
                                        <div className='flex flex-col relative'>
                                            <label className=''>Password</label>
                                            <input onChange={(e) => setPassword(e.target.value)} type='text' name='password' placeholder='create password' className={`outline-none border border-blue-100 rounded-sm p-2 `} />

                                        </div>
                                        <div className='flex flex-col relative'>
                                            <label className=''>OTP</label>
                                            <input maxLength={6} onChange={(e) => setOtp(e.target.value)} type='text' name='otp' className={` font-bold tracking-[30px] md:tracking-[45px] lg:tracking-[45px] pl:5 lg:pl-10  md:pl-10  outline-none border border-blue-100 rounded-sm p-2 `} />

                                        </div>
                                    </>

                                )
                            }
                            {
                                isEmailSend ?

                                    <Button onClick={resetPassword} type="button" variant='secondary' className='mt-5 w-full'>
                                        {
                                            loader ? (
                                                <RotateCw className=' animate-spin transition-all w-10 h-10' />
                                            ) :
                                                "Reset Password"
                                        }
                                    </Button>

                                    :
                                    <Button onClick={sendOtp} type="button" variant='secondary' className='mt-5 w-full'>
                                        {
                                            loader ? (
                                                <RotateCw className=' animate-spin transition-all w-10 h-10' />
                                            ) :
                                                "Send Otp"
                                        }
                                    </Button>
                            }

                            <div className='grid lg:flex md:flex'>
                                <small className=' text-center w-full'>Already have an account <Link href="./signin" className='text-blue-600'>signin</Link></small>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
