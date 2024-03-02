'use server'

import {cookies} from 'next/headers';

export async function setCookies(name:string, data:string){
    cookies().set(name, data) 
}

export async function getCookies(){
    const cookieStore = cookies()
    const value = cookieStore.get('userData')
    
    if(value) return value 
    return {value: null}
}

export async function removeCookies(data:string){
    cookies().delete(data)
}

export const getAccessToken = async () => {
    return cookies().get("accessToken")
}

export const getRefreshToken = async () => {
    return cookies().get("refreshToken")
} 
