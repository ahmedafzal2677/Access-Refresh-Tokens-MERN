import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";


const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/',
    mode:'cors',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        
        const token = getState().root.auth.token
        console.log('baseQuery-token',token?.accessToken, typeof(token))
        if(token){
            headers.set('authorization',`Bearer ${token?.accessToken}`)
        }

        return headers;
    } 
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions );

    console.log('baseQueryWithReAuth',result)

    if(result?.error?.data === 'Unauthorized'){
        console.log('Sending New Access Token')

        const newToken = await baseQuery('refresh', api, extraOptions)
        console.log('newToken',newToken)

        if(newToken?.data){
            console.log('newToken?.data',newToken?.data)
            api.dispatch(setCredentials( newToken?.data?.accessToken))
            result = await baseQuery(args, api, extraOptions)
        }else{
            newToken.error.data = "Your Login Session has Expired."
            return newToken;
        }

    }

    return result;
}



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({ 
        getData: builder.query({
            query: () => 'xyz'
        }),
    }),
    tagTypes: ['dashboard']
}) 

export const { useGetDataQuery } = apiSlice;