'use client'
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, LoaderCircle, Pencil, Phone, MapPin, RotateCw, CheckCircle2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogClose,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link';
import axios from 'axios';

import { toast } from 'sonner';


const joinedCoures = [
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

]

function Profile() {
   const [avatar, setAvtar] = useState();
   const [bannerImg, setBannerImg] = useState();
   const [banner, setBanner] = useState();
   const [preview, setPreview] = useState();
   const [address, setAddress] = useState({ city: "", pincode: "", state: "", country: "" });
   const [loader, setLoader] = useState(false);
   const [success, setSuccess] = useState(false)
   const [user, setUserData] = useState()
   const [personalDetails, setPersonalDetails] = useState({
      fullname: "",
      mobileno: "",
      about: "",
   })
   // Get user data
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

   // Update user profile
   const getProfileDetails = (e) => {
      const { name, value } = e.target;
      setPersonalDetails((prev) => (
         { ...prev, [name]: value }
      ))
      setAddress((prev) => (
         { ...prev, [name]: value }
      ))
   }

   // Update user profile
   const loadAvtar = (e) => {
      const file = e.target.files[0];
      const src = URL.createObjectURL(file);
      setPreview(src);
      setBannerImg(src);
      setAvtar(file)
      setBanner(file);
   }


   const updateProfile = async (e) => {
      e.preventDefault();
      try {
         setLoader(true)
         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/update-profile`,
            {
               fullname: personalDetails.fullname,
               mobileno: personalDetails.mobileno,
               about: personalDetails.about
            },
            {
               headers: {
                  'Content-Type': 'application/json'
               },
               withCredentials: true
            }
         );

         if (response.data.success) {
            setSuccess(true)
         }
      } catch (error) {
         console.log(error)
      }
      finally {
         setLoader(false);
         setTimeout(() => {
            setSuccess(false);
         }, 3000);


      }
   }


   // Update Avatar
   const updateAvtar = async (e) => {
      e.preventDefault()
      const formdata = new FormData();
      formdata.append('avatar', avatar);

      const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/update-avtar`,
         formdata,
         {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
         }
      );
      console.log(result.data)
   }

   // Update Banner
   const updateBanner = async (e) => {
      e.preventDefault()
      const formdata = new FormData();
      formdata.append('banner', banner);


   }
   //Update Address
   const updateAddress = async (e) => {
      e.preventDefault()
      try {
         setLoader(true)
         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/update-address`,
            {
               city: address.city,
               pincode: address.pincode,
               state: address.state,
               country: address.country
            },
            {
               headers: {
                  'Content-Type': 'application/json'
               },
               withCredentials: true
            }
         );

         if (response.data.success) {
            setSuccess(true)
         }
      } catch (error) {
         console.log(error)
      }
      finally {
         setLoader(false);
         setTimeout(() => {
            setSuccess(false);
         }, 3000);

      }

   }




   return (
      <>

         {/* main */}
         <div className=' container mx-auto w-[1080px] h-screen'>
            <div className=' p-4'>
               <Link href="./dashboard/chats">
                  <ArrowLeft className='text-gray-600 hover:bg-gray-200 hover:rounded-full w-7 h-7 transition-all' />
               </Link>
            </div>
            <div>
               <div className='relative'>
                  {/* banner image */}
                  <Image
                     src={'/sample_banner.png'}
                     width={896}
                     height={100}
                     alt='banner'
                     className='  object-cover rounded-sm w-full h-[200px]'
                  />
                  {/* banner update */}
                  <Dialog>
                     <DialogTrigger asChild>
                        <Button variant={"outlined"} className="bg-white w-8 h-8 absolute bottom-2 right-2 rounded-full"><Pencil className='w-3 h-3' /></Button>
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[425px] bg-white">
                        <form onSubmit={updateBanner}>
                           <DialogHeader>
                              <DialogTitle className="font-semibold text-center">Add New Banner</DialogTitle>
                           </DialogHeader>
                           <div className="grid gap-4 py-4" >
                              <section className="grid relative p-5 border-2 border-dashed">
                                 <label htmlFor="dropzone-file">
                                    <img
                                       src='/file.svg'
                                       className='w-10 h-10 mx-auto'
                                    />
                                    <p className='font-medium opacity-40 text-center'>Click to upload or drag and drop</p>
                                    <p className='font-medium opacity-40 text-center'>SVG, PNG, JPG or GIF</p>
                                    <input id="dropzone-file" type='file' onChange={(e) => loadAvtar(e)} name='avtar'
                                       className=' z-50 hidden'
                                    />
                                 </label>
                              </section>
                              {
                                 preview && (
                                    <section className='border w-full h-[100px] mx-auto'>
                                       <img src={preview} alt="preview" className=' object-cover w-full h-full' />
                                    </section>)
                              }

                           </div>
                           <DialogFooter className="mt-5 flex">
                              <Button type="submit" className="">
                                 {
                                    loader ? "Save changes" : <LoaderCircle />
                                 }
                              </Button>

                           </DialogFooter>
                        </form>
                     </DialogContent>
                  </Dialog>
               </div>

               {/* profile image */}

               <div className=' p-3 flex justify-between'>
                  <div className='flex'>
                     <div className='w-[20%]'>
                        <section className=' bg-blue-500 rounded-full '>
                           <Image
                              src={'/accets/avtar.png'}
                              width={896}
                              height={100}
                              alt='banner'
                              className='w-fit h-auto rounded-full'
                           />
                        </section>
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button variant='outline' className="w-22  mt-4 mx-10"><Pencil />Avtar</Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[425px] bg-white">
                              <form onSubmit={updateAvtar}>
                                 <DialogHeader>
                                    <DialogTitle className="font-semibold text-center">Add New Avtar</DialogTitle>
                                 </DialogHeader>
                                 <div className="grid gap-4 py-4" >
                                    <section className="grid relative p-5 border-2 border-dashed">
                                       <label htmlFor="dropzone-file">
                                          <img
                                             src='/file.svg'
                                             className='w-10 h-10 mx-auto'
                                          />
                                          <p className='font-medium opacity-40 text-center'>Click to upload or drag and drop</p>
                                          <p className='font-medium opacity-40 text-center'>SVG, PNG, JPG or GIF</p>
                                          <input id="dropzone-file" type='file' onChange={(e) => loadAvtar(e)} name='avtar'
                                             className=' z-50 hidden'
                                          />
                                       </label>
                                    </section>
                                    {
                                       preview && (
                                          <section className='border w-[100px] h-[100px] rounded-full mx-auto'>
                                             <img src={preview} alt="preview" className='rounded-full object-contain w-full h-full' />
                                          </section>)
                                    }

                                 </div>
                                 <DialogFooter className="mt-5">
                                    <Button type="submit" className="w-full">Save changes</Button>
                                 </DialogFooter>
                              </form>
                           </DialogContent>
                        </Dialog>
                     </div>

                     {/* Details */}
                     <div className='p-7'>
                        <h1 className='font-semibold text-xl '>{user?.fullname}</h1>
                        <p className=' line-clamp-3'>{user?.about}</p>

                        <label className=' mt-2'>
                           <h1 className='my-auto gap-2 mt-2 text-blue-600  flex'><Mail className='w-5 h-5' />{user?.email}</h1>
                           <h1 className='my-auto gap-2 mt-2 text-blue-600  flex'><Phone className='w-5 h-5' />{user?.mobileno}</h1>
                        </label>
                        <label>
                           <h1 className='gap-2 mt-2 text-blue-600  flex'><MapPin className='w-5 h-5' />{user?.address.city}</h1>
                        </label>
                     </div>
                  </div>

                  <div className='  my-auto'>
                     <Dialog >
                        <DialogTrigger asChild>
                           <Button variant='outline' className="w-[130px]" ><Pencil />Edit profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                           <form onSubmit={updateProfile}>
                              <DialogHeader>
                                 <DialogTitle className="font-semibold text-center">Edit Personal Details</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4" >
                                 <section className="grid">
                                    <label className='text-base '>Username</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='fullname' placeholder='Full name' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                                 <section className="grid">
                                    <label className='text-base '>Contact Number</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='mobileno' placeholder='Contact number' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                                 <section className="grid">
                                    <label className='text-base '>About</label>
                                    <textarea onChange={(e) => getProfileDetails(e)} name='about' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                              </div>
                              <DialogFooter>
                                 <DialogClose asChild>
                                    <Button >Close</Button>
                                 </DialogClose>
                                 <Button type="submit" className="">
                                    {
                                       !loader ? "Save changes" : <RotateCw className='w-10 h-10 animate-spin transition-all ' />
                                    }
                                 </Button>
                              </DialogFooter>
                           </form>
                        </DialogContent>
                     </Dialog>

                     {/* Edit Address */}

                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant='outline' className=" mt-14 w-[130px]" ><Pencil />Add address</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                           <form onSubmit={updateAddress}>
                              <DialogHeader>
                                 <DialogTitle className="font-semibold text-center">Add New Address</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4" >
                                 <section className="grid">
                                    <label className='text-base '>City</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='city' placeholder='city' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                                 <section className="grid">
                                    <label className='text-base '>Pin</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='pincode' placeholder='6-digit' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                                 <section className="grid">
                                    <label className='text-base '>State</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='state' placeholder='state' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                                 <section className="grid">
                                    <label className='text-base '>Country</label>
                                    <input onChange={(e) => getProfileDetails(e)} name='country' placeholder='country' className='outline-none border border-gray-300 rounded-sm p-1' />
                                 </section>
                              </div>
                              <DialogFooter>
                                 <Button type="submit">
                                    {
                                       !loader ? "Save changes" : <RotateCw className='w-10 h-10 animate-spin transition-all ' />
                                    }
                                 </Button>
                              </DialogFooter>
                           </form>
                        </DialogContent>
                     </Dialog>
                  </div>

               </div>
               <hr />
               {/* testimonials */}
               <div className='p-7'>
                  <label className='text-xl font-semibold'>Your Courses</label>
                  <div className='flex gap-3 my-5'>
                     {
                        joinedCoures.map((item, index) => (
                           <section key={index} className=''>
                              <Image
                                 src={item.thumbnail}
                                 alt='thumbanil'
                                 width={100}
                                 height={100}
                                 className='rounded-sm aspect-video w-2xl'
                              />
                           </section>
                        ))
                     }
                  </div>
               </div>

            </div>
         </div>

         {/* Dialog for  */}
         <div>

         </div>

         {/*  notifications  */}
         {
            success ? (
               <div className='fixed top-10 right-[30%] left-[30%] transition-all'>
                  <Alert variant={'destructive'} >
                     <CheckCircle2Icon />
                     <AlertTitle>Success</AlertTitle>
                     <AlertDescription>
                        Success! Your changes have been saved
                     </AlertDescription>
                  </Alert>
               </div >)
               :
               ""
         }
      </>
   )
}

export default Profile;