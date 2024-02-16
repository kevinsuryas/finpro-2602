import Image from "next/image"
import Link from "next/link"
export default function Navbar () {
    return(
        <>
<div className="navbar bg-neutral h-[8rem] z-[12] sticky top-0 ">
    <div className="navbar-start">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href={"/"}>Home</Link></li>
               <Link href='#location'> 
                    <li>
                        Location   
                    </li>
                </Link>
            <li><a>Contact Us</a></li>
        </ul>
        </div>
        <a> <Image className='w-[25rem] ml-10' src='/Logo.png' alt='image' width={1000} height={1000} /></a>
    </div>
    {/* Web Navbar */}
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ml-20 gap-5">
                <Link href="/">
                    <li className="text-xl"> 
                        Home
                    </li>
                </Link>
                <Link href='#location'>
                    <li className="text-xl">
                        Location
                    </li>
                </Link>
                <Link href='#contact'>
                    <li className="text-xl">
                        Contact Us
                    </li>
                </Link>
        </ul>
    </div>
    <div className="navbar-end gap-5 mr-10">
        <Link href="/user/login" className="btn btn-primary text-white font-bold w-[5rem]">Login</Link>
        <Link href="/user/register" className="btn btn-primary text-white font-bold w-[7rem]">Register</Link>
    </div>
</div>
        </>
    )
}