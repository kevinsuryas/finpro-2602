'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { verificationSchema } from '@/features/schemas/user/yupSchema'

import { axiosInstance } from '@/utils/axiosInstance'


export default function Verification() {

    const {token: accessToken} = useParams()
    const router = useRouter()


    // const {isError, isLoading} = useQuery({
    //     queryKey: ['validateUser'],
    //     queryFn: async() => {
    //         const response = await axiosInstance.post('/user/verification/validate', {
    //             accessToken
    //         })
    //         return response.data
    //     }
    // })
    
    const {mutate} = useMutation({
        mutationFn: async({name, phoneNumber, password }: any) => {
            const response = await axiosInstance.post('/user/verification', {
                name, phoneNumber, password, accessToken
    const {mutate} = useMutation({
        mutationFn: async({name, phoneNumber, password }: any) => {
            const response = await axios.post('http://localhost:8000/api/user/verification', {
               name, phoneNumber, password, accessToken
            }) 
            return response.data
        },
        onSuccess: (data) => {
            toast.success(data.message)
            setTimeout(() => {           
                router.push('/')
            }, 1500);
        },
        onError: ({response}:any) => {
            toast.error(response.data.message)   
        }
    })

    // if(isLoading) return <p>Loading...</p>
    // if(isError) return <div>Not Found</div>

        onError: (error) => {
            console.log(error)
            toast.error('Error')   
        }
    })

    return (
        <section className="relative w-full h-full bg-zinc-900/90">
            <Toaster/>
        <Image className='absolute w-full h-full object-cover mix-blend-overlay' src="https://images.unsplash.com/photo-1578070181910-f1e514afdd08?q=80&w=1866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="/" width={1920} height={1080} />

                <Formik
                    initialValues={{name: '', phoneNumber: '', password: ''}}
                    validationSchema={verificationSchema}
                    onSubmit={async(values) => {
                        const {name, phoneNumber, password} = values 
                        await mutate({name, phoneNumber, password})
                    }}
                >
    
        <Form>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">        
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                    Verification
                </h1>
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                        <Field
                                name="name"
                                type="text"
                            >{({field}:any) => (
                                <input {...field} 
                                    placeholder="Enter Your Name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="name"
                            />  
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone Number</label>
                        <Field
                                name="phoneNumber"
                                type="text"
                            >{({field}:any) => (
                                <input {...field} 
                                    placeholder="Enter your Phone Number" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="phoneNumber"
                            />  
                    </div>
                    
                    <div>
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
                                </div>
                    <div className="flex items-start">   
                    </div>
                    <button type="submit" className="w-full btn btn-block bg-white hover:bg-zinc-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black ">Verified</button>
                </div>
            </div>
        </div>
    </div>
        </Form>
    </Formik>
</section>
    )
}