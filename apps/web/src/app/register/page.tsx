'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import *as Yup from 'yup'

export default function Register () {

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, 'Username Must be 6 Characters')
            .required('Username is Required')
        , 
        email: Yup.string()
            .email('Invalid Email Address')
            .required('Email is Required')
        , 
        password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
    })
   
    const {mutate} = useMutation({
        mutationFn: async({username, email, password, referredBy}) => {
            await axios.post('http://localhost:8000/user/register', {
                username, email, password, referredBy
            }) 
        },
        onSuccess: () => {
           alert('Success')
        },
        onError: (error) => {
            console.log(error)
            alert('Error')
            
            
        }
    })
    
    return(
        <section className="relative w-full h-full bg-zinc-900/90">
        <img className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1585499583264-491df5142e83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <Formik
                    initialValues={{username: '', email: '', password: '', referredBy: ''}}
                    validationSchema={registerSchema}
                    onSubmit={async(values) => {
                        const {username, email, password, referredBy} = values 
                        await mutate({username, email, password, referredBy})
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
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username</label>
                        <Field
                                name="username"
                                type="text"
                            >{({field}) => (
                                <input {...field} 
                                    placeholder="Type Username" 
                                    className="bg-gray-50 border border-gray-300 text- sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="username"
                            />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                        <Field
                                name="email"
                                type="text"
                            >{({field}) => (
                                <input {...field} 
                                    placeholder="name@gmail.com" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            )}
                            </Field>
                            <ErrorMessage 
                                name="email"
                            />  
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                        <Field
                                name="password"
                                type="password"
                            >{({field}) => (
                                <input {...field} 
                                    type = 'password'
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
                        <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-primary dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-black dark:text-black">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit" className="w-full btn btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-black">
                        Already have an account? <a href="./Login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
        </Form>
    </Formik>
</section>
    )
}