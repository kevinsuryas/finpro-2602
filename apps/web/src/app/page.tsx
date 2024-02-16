'use client'

import { fetchUseQuery } from "@/features/fetchUseQuery"
import { setUser } from "@/stores/slice/userSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from '@/components/landingPage/Hero'
import Location from '@/components/landingPage/Location'
import Image from "next/image";

export default function Home() {
  const { data, isLoading, isError } = fetchUseQuery("user", "/user")
  const [location, setLocation] = useState()
  const dataUser: any = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const setDispatch = (username: string, password: string) => {
    dispatch(setUser({
      username, password
    }))
  }

  const binderbyte = async () => {
    try {
      const res = await axios.get(`https://api.binderbyte.com/wilayah/provinsi?api_key=${process.env.BINDERBYTE_API_KEY}`)
      setLocation(res.data.value)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMidtrans = useQuery({
    queryKey: ["midtrans"],
    queryFn: async () => {
      const res = await axiosInstance.post("/midtrans")
      return res.data
    }
  })

  useEffect(() => {
    const loadMidtransScript = () => {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute("data-client-key", process.env.MIDTRANS_CLIENT_KEY as string)
      script.async = true;
      document.head.appendChild(script);
    };

    binderbyte()
    loadMidtransScript()
  }, []);

  if (isLoading) return (<p>Loading...</p>)
  if (isError) return (<p>Something Error, Please Refresh...</p>)
  return (
  <>
      <Hero/>
      <div className='bg-secondary w-full py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
         <Image className='w-[500px] mx-auto my-4' src='/Delivery.png' alt='image' width={1000} height={1000} />
         <div className='flex flex-col justify-center'>
           <h1 className='md:text-6xl sm:text-4xl text-3xl font-bold py-2'>Our Services</h1>
           <p className='py-4 text-2xl'> We're always looking for ways to make laundry and dry cleaning more convenient. 
           In addition to our delivery service, we also provide pick up service. So get your laundry clean and fragrant right now !</p>
          <button className='btn btn-primary w-[200px] font-medium rounded-md  my-6 mx-auto md:mx-0 py-3 text-white'>Request Pick Up</button>
         </div>
      </div>
    </div>
      <Location/>
  </>
  )
}