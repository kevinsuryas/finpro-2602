'use client'
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import { signIn, signOut, useSession } from "next-auth/react";


export default function Login() {
    const [loginError, setLoginError] = useState('');

    // Updated Yup schema for form validation
  const loginSchema = Yup.object().shape({
    email: Yup.string()
            .email('Invalid Email Address')
            .required('Email is Required'),
            password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
  });
 
  const handleLogin = async (values:any, { setSubmitting }:any) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/login',
        values,
      );
      Cookies.set('sessionToken', response.data.token, { expires: 7 });
      setLoginError('');
      alert('Login Successful! Welcome back!');
      window.location.href = '/';
    } catch (error:any) {
      if (error.response) {
        setLoginError(error.response.data.message);
      } else if (error.request) {
        setLoginError('Server did not respond. Please try again later.');
      } else {
        setLoginError('An error occurred during login');
      }
    }
    setSubmitting(false);
}
      
    return (
        <>
        <section className="relative w-full h-full bg-zinc-900/90">
        <Image className="absolute w-full h-full object-cover mix-blend-overlay " src="https://images.unsplash.com/photo-1585499583264-491df5142e83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={1920} height={1080} />
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
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
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-black">Forgot password?</a>
                                    </div>
                                    <button type="submit" onClick={() => {}} disabled={isSubmitting} className="w-full mt-5 text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                        <p className="text-sm font-light text-black dark:text-black mt-4 mb-5">
                                            Don't have an account yet? <Link href="/register" className="font-medium text- hover:underline dark:text-primary-500">Register</Link>
                                        </p>
                                <div className="flex justify-center">
                                    <button onClick={() => {signIn('google')}} className="flex justify-center text-sm w-full items-center border shadow-lg hover:shadow-xl px-6 py-2 relative bg-white rounded-lg hover:bg-gray-100 cursor-pointer"><FcGoogle className="flex items-center mr-2 w-6 h-6"/> Login With Google</button>
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
