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
import { useParams } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { resetPasswordSchema } from '@/features/schemas/user/yupSchema'
export default function ResetPassword() {
    const params = useParams()
    const router = useRouter()

  
    const {mutate} = useMutation({
        mutationFn: async({password}:any) => {
            const response = await axiosInstance.post('/user/resetPassword', {
                password, token:params.token
            }) 
            return response.data
        },
        onSuccess: (data) => {
           toast.success(data.message)
           setTimeout(() => {
            router.push('/')
           }, 1000);
        }, 
        onError: (data:any) => {
            // console.log(error)
            toast.error(data.response.data.message)        
        }
    })
    
    return(
        <section className="relative w-full h-full bg-zinc-900/90">
            <Toaster/>
        <Image className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={1920} height={1080} />
                <Formik
                    initialValues={{password:'', passwordConfirmation: ''}}
                    validationSchema={resetPasswordSchema}
                    onSubmit={async(values) => {
                        const {password} = values 
                        await mutate({password })
                    }}
                >
    
        <Form>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">        
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary dark:border-gray-700">
            <div className="p-6 space-y- md:space-y-4 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                    Confirm Your Password
                </h1>
                <p className='text-sm text-gray-500 '>
                    Please enter your new password.
                </p>
                <div className="space-y-4 md:space-y-6">
                    <p></p>
                    <div>
                    <label htmlFor="new password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">New Password </label>
                        <Field
                                name="password"
                                >{({field}: any) => (
                                    <input {...field} 
                                    type="password"
                                    placeholder="Enter Your New Password" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="password"
                            />  
                    </div>
                    <div>
                    <label htmlFor="confirm password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm Password </label>
                        <Field
                                name="passwordConfirmation"
                                >{({field}: any) => (
                                    <input {...field} 
                                    type="password"
                                    placeholder="Enter Your Password Confirmation" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="passwordConfirmation"
                            />  
                    </div>
                    
                    <button type="submit" className="w-full btn btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Confirm</button> 
                </div>
            </div>
        </div>
    </div>
        </Form>
    </Formik>
</section>
    )
}