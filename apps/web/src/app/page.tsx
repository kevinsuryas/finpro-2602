'use client'

import { fetchUseQuery } from "@/features/fetchUseQuery"
import { setUser } from "@/stores/slice/userSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading, isError } = fetchUseQuery("user", "/user")
  const dataUser: any = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const setDispatch = (username: string, password: string) => {
    dispatch(setUser({
      username, password
    }))
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

    loadMidtransScript();
  }, []);


  if (isLoading) return (<p>Loading...</p>)
  if (isError) return (<p>Something Error, Please Refresh...</p>)
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(dataUser.user)}</p>
      <button onClick={() => setDispatch("onClick Username", "onClick password")}>Change Redux</button>
      <br />
      <button id="pay-button" className="bg-blue-950 text-white" onClick={() => snap.pay(fetchMidtrans?.data?.data?.token)}>Test Midtrans</button>
    </div>
  )
}