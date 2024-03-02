'use client'
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import *as Yup from 'yup'

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// import redux
import { setUser } from "@/stores/slice/userSlice";
import { useDispatch } from "react-redux";
import { setCookies } from "@/features/cookies";
import { signIn, signOut, useSession } from "next-auth/react";
import { loginSchema } from "@/features/schemas/user/yupSchema";


export default function Login() {
    const router = useRouter()

  // 1.2. Define useDispatch
  const dispatch = useDispatch()
  const route = useRouter()

  const {mutate} = useMutation({
    mutationFn: async({email, password}:any) => {
        const response = await axios.post('http://localhost:8000/api/user/login', {
            email: email.toLowerCase(), password
        }) 
        return response.data
    },
    onSuccess: (data) => {
        dispatch(setUser(data.data.email)) // {id:, username:, password}
        toast.success(data.message)
        setTimeout(() => {
           route.push('/') 
       }, 1500);

        setCookies("accessToken", data.data.accessToken)
        setCookies("refreshToken", data.data.refreshToken)
        
        setTimeout(() => {
            route.push('/')
        }, 1000)
    },
    onError: ({response}:any) => {
        toast.error(response.data.message)        
    }
})
      
    return (
        <>
        <section className="relative w-full h-full bg-zinc-700/70">
            <Toaster/>
        <Image className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1483401757487-2ced3fa77952?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={1920} height={1080} />
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={loginSchema}
                    onSubmit={async (values) => {
                        const {email, password} = values
                        await mutate({email, password})
                    }}
                >
     {({ isSubmitting }) => (
        <Form>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">        
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                        Login to your account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                            <Field
                                    name="email"
                                    type="text"
                                >{({field}: any) => (
                                    <input {...field} 
                                        placeholder="Enter Your Email" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    />
                                )}
                                </Field>
                                <ErrorMessage 
                                    name="email"
                                />  
                                <div className="mt-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                <Field
                                            name="password"
                                        >{({field}:any) => (
                                            <input {...field} 
                                            type="password"
                                            placeholder="*******" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        />
                                    )}
                                    </Field>
                                    <ErrorMessage 
                                        name="password"
                                    />  
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-start">
                                        </div>
                                        <Link href="/reset-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-black">Forgot password?</Link>
                                    </div>
                                    <button type="submit" onClick={() => {}} disabled={isSubmitting} className="w-full mt-5 text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                        <p className="text-sm font-light text-black dark:text-black mt-4 mb-5">
                                            Don't have an account yet? <Link href="/register" className="font-medium text- hover:underline dark:text-primary-500">Register</Link>
                                        </p>
                                <div className="flex justify-center">
                                    <p onClick={() => {signIn('google')}} className="flex justify-center text-sm w-full items-center border shadow-lg hover:shadow-xl px-6 py-2 relative bg-white rounded-lg hover:bg-gray-100 cursor-pointer"><FcGoogle className="flex items-center mr-2 w-6 h-6"/> Login With Google</p>
                                </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </Form>
     )}
    </Formik>
     </section>
        </>
)
}
