import React, { createContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/auth/authSlice'


const AuthContext = createContext('')

const AuthProvider = ({ children }) => {

    const selector = useSelector(selectCurrentToken)
    const [auths, setAuths] = useState()

  return (
    <AuthContext.Provider value={{ selector }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;