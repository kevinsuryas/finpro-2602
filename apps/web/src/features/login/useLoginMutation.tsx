// import { axiosInstance } from '@/utils/axiosInstance'
// import {useMutation} from '@tanstack/react-query';



// export const useLoginMutation = ({onSuccess, onError}: any) => {
//     const {status, mutate, data} = useMutation({
//         mutationFn: async({ email, password }:any) => {
//             try {
//                 const response = await axiosInstance.post('/user/login', { email, password });
//                 return response;
//             } catch (error: any) {
//                 throw new Error(error.response.data.message);
//             }  
//         },
//         onSuccess: (response) => {
//             onSuccess(response)
//         },
//         onError
//     })

//     return{
//         status,
//         mutate,
//     }
// }