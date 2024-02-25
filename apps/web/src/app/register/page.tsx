'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import Link from 'next/link'
import toast, {Toaster} from 'react-hot-toast'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/features/schemas/user/yupSchema'

export default function Register () {
   
    const router = useRouter()

    const {mutate} = useMutation({
        mutationFn: async({email}:any) => {
            const response = await axios.post('http://localhost:8000/api/user/register', {
                email: email.toLowerCase()
            }) 
            return response.data
        },
        onSuccess: (data) => {
            toast.success(data.message) 
            setTimeout(() => {
               router.push('/register/sending')
           }, 1000);
        },
        onError: (error) => {
            toast.error(error.message)        
        }
    })
    
    return(
        <section className="relative w-full h-full bg-zinc-700/70">
        <Toaster/>
        <Image className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1483401757487-2ced3fa77952?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={1920} height={1080} />
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={registerSchema}
                    onSubmit={async(values) => {
                        const {email} = values 
                        await mutate({email})
                    }}
                >
    
        <Form>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">        
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                    Register
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
                    </div>
                    {/* <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-primary dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-black dark:text-black">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div> */}
                    <button type="submit" className="w-full btn btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-black">
                        Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p>
                </div>
                    <div className="flex justify-center">
                        <p onClick={() => signIn('google')} className="flex justify-center text-sm w-full items-center border shadow-lg hover:shadow-xl px-6 py-2 relative bg-white rounded-lg hover:bg-gray-100 cursor-pointer"><FcGoogle className="flex items-center mr-2 w-6 h-6"/> Login With Google</p>
                    </div>
            </div>
        </div>
    </div>
    </Form>
    </Formik>
</section>
    )
}