// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useGetDataQuery } from '../redux/apiSlice'
// import axios from '../redux/auth/api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Dashboard = () => {

  const axiosPrivate = useAxiosPrivate();
  const auth = useSelector(state => state.auth)
  console.log('auth111',auth)
  const selectCurrentToken1 = useSelector(selectCurrentToken)
  console.log('selectCurrentToken',selectCurrentToken1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let flag = localStorage.getItem('persist')

  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess
  } = useGetDataQuery('dashboard',{
    pollingInterval: 150000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  // console.log('data query', data,isError,
  // isFetching,
  // isLoading,
  // isSuccess)

  useEffect(() => {
    if(!flag){
      navigate('/login')
    }
  },[flag])


  useEffect(() => {
      const controller = new AbortController();

      const getData = async () => {
        try {
          let response = await axiosPrivate.get('/xyz')

          console.log('AbortController', controller)

          return response?.data;

        } catch (error) {
          console.error(error)
        }
          
      }

      getData();

      return () => {
        // controller.abort();
      }

  },[])


  return (
    <>
    <PayPalScriptProvider options={{ clientId: 'AfsHVfCtbpeZrls6rcWJzsIyhqugZ2gxLFrptx7Qy6IZvM4KV5cpKSLzy9VdnDTTS5Mshpfj4OPI5TVD'}}>
        <PayPalButtons 
          // createOrder={handleCreateOrder}
          // onApprove={handleApproveOrder}
        />
    </PayPalScriptProvider>
    </>
  )
}

export default Dashboard