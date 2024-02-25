import Image from "next/image"
import Link from "next/link"
export default function SendingResetPassword () {
    return(
        <>
        <section className="relative w-full h-full bg-zinc-900/90">
        <Image className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={1920} height={1080} />
        <div className="h-screen flex justify-center items-center max-w-[1240px] mx-auto">
            <div className="card max-w-[50rem] h-[20rem] bg-secondary text-primary-content">
                <div className="card-body text-center mb-10">
                    <h2 className="font-bold text-4xl text-center mb-5">Check Your Email</h2>
                    <p className="text-2xl">We have sent you an email</p>
                    <p className="text-2xl ">if you haven't received it, please check your spam</p>
                    <div className="card-actions justify-end py-5">
                    <Link href='/'className="btn btn-primary text-2xl font-bold w-full text-center text-white">OK</Link> 
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}