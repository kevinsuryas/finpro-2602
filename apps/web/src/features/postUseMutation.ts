import { axiosInstance } from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"

export const postUseMutation = (key: string, api: string, values: object) => {
    return useMutation({
        mutationKey: [`${key}`],
        mutationFn: async () => {
            const res = await axiosInstance.post(api, values)
            return res.data
        }
    })
}