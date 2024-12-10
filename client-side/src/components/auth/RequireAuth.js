import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../redux/auth/authSlice'
import { Navigate, useLocation } from 'react-router-dom'
import DashboardPage from '../../pages/DashboardPage'

const RequireAuth = () => {

    const token = useSelector(selectCurrentToken) 
    const location = useLocation();

  return (
    token?.accessToken ? <DashboardPage/> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth