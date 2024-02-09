'use client'

import { fetchUseQuery } from "@/features/fetchUseQuery"
import { setUser } from "@/redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const { data, isLoading, isError } = fetchUseQuery("user", "/user")
  const dataUser: any = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const setDispatch = (username: string, password: string) => {
    dispatch(setUser({
      username, password
    }))
  }

  if (isLoading) return (<p>Loading...</p>)
  if (isError) return (<p>Something Error, Please Refresh...</p>)
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(dataUser.user)}</p>
      <button onClick={() => setDispatch("onClick Username", "onClick password")}>Change Redux</button>
    </div>
  )
}