import React, { useEffect } from 'react'
import axios from '../redux/auth/api/axios'

const useRefershToken = () => {

    const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials: true
        })

        console.log('refresh',response)
    }

  return refresh;
}

export default useRefershToken