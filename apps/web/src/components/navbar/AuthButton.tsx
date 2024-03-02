'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
    const { data: session }: any = useSession()

    if (session) {
        return (
            <>
                {JSON.stringify(session)}
                {session.user?.name} <br />
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }

    return (
        <>
            <p>Not signed in</p>
            <button onClick={() => signIn()}>Sign In</button>
        </>
    )
}