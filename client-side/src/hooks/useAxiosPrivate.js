import React, { useEffect } from 'react'
import useRefershToken from './useRefershToken'
import { axiosPrivate } from '../redux/auth/api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/auth/authSlice';

const useAxiosPrivate = () => {

    const refresh = useRefershToken();
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken)

    
//   useEffect(() => {
//     axios.get('http://localhost:5000/refresh',{
//       headers: {
//         'Authorization': `Bearer ${selectCurrentToken1}`
//       }
//     })
//     .then(res => console.log('res.data',res.data))
//     .catch(err => console.log('err.message',err.message))
//   },[])


    useEffect(() => {


        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${token.accessToken}`
                }

                return config;
            }, (error) => {
                return Promise.reject(error)
            }
        )


        const repsonseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,

            async (error) => {
                const prevRequest = error?.config;
                console.log('prevRequest',prevRequest, error?.response)
                if(error?.response?.status == 401 && !prevRequest.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('newAccessToken',newAccessToken?.data)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)

                } 

                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(repsonseInterceptor)
        }


    },[])


  
    return axiosPrivate;
}

export default useAxiosPrivate;