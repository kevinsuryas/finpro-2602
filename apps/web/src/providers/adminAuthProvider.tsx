'use client'

import { getCookies } from "@/utils/cookies"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function AdminAuthProvider({ children }: any) {
    const router = useRouter()

    const fetchData = async () => {
        const data = await getCookies();
        if (!data) {
            router.push("/admin/login");
        } else {
            router.push("/admin");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <>{children}</>
}