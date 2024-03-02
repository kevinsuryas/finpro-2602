'use client'

import InputBox from "@/components/cores/InputBox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/features/schemas/admin/yupSchema"
import SubmitFormikButton from "@/components/cores/formik/SubmitFormikButton";
import { postUseMutation } from "@/features/postUseMutation";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance"
import { setCookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
    const router = useRouter()
    const { mutate } = useMutation({
        mutationKey: [`loginAdmin`],
        mutationFn: async (values: any) => {
            const res = await axiosInstance.post("/admin/login", values)
            return res.data
        },
        onSuccess: (data: any) => {
            setCookies(data.data)
            alert(data.message)
            router.push("/admin")
        },
        onError: ({ response }: any) => {
            alert(response.data.message)
        }
    })

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-primary">
            <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={(values) => mutate(values)}>
                {({ dirty, isValid }) => (
                    <Form>
                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-center text-primary">Login Admin</h1>
                            <div>
                                <Field name="username">
                                    {({ field }: any) => (
                                        <InputBox field={field} label="Username" type="text" placeholder="Input Username" />
                                    )}
                                </Field>
                                <ErrorMessage name="username" />
                            </div>
                            <div>
                                <Field name="password">
                                    {({ field }: any) => (
                                        <InputBox field={field} label="Password" type="password" placeholder="Input Password" />
                                    )}
                                </Field>
                                <ErrorMessage name="password" />
                            </div>

                            <SubmitFormikButton data={{ dirty, isValid }} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}