'use server'

import { cookies } from "next/headers"

export const setCookies = async (data: string) => {
    cookies().set("loginData", data)
}

export const getCookies = async () => {
    return cookies().get("loginData")
}

export const removeCookies = async () => {
    cookies().delete('userData')
}