import { axiosInstance } from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export const fetchUseQuery = (queryKey: string, api: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: async () => {
            const res = await axiosInstance.get(`${api}`)
            return res.data
        }
    })

    return {
        data,
        isLoading,
        isError
    }
}