import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import  { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { selectCurrentToken, setCredentials } from '../redux/auth/authSlice'
import useAuth from '../hooks/useAuth'
import usePersist from '../hooks/usePersist'


const Login = () => {

const { selector } = useAuth()

const [email,setEmail] = React.useState('')
const [pass,setPass] = React.useState('')
const navigate = useNavigate();
const auth = useSelector(state => state.auth)
const dispatch = useDispatch()
const  [ persist, setPersist]  = usePersist();
// const query =
// console.log('auth',auth)



const handleFormSubmit = async (e) => { 
    e.preventDefault();
    console.log('handleFormSubmit')
   
    if(email && pass){
        const data = {
            email: email,
            password: pass
        }

        await axios.post('http://localhost:5000/login',data,{
            headers:{
                'Content-type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            console.log('res',res?.data)

            if(res?.data?.accessToken !== null){
                dispatch(setCredentials(res?.data?.accessToken))
                setPersist(true)
                // selector.accessToken = res?.data?.accessToken
                // Cookies.set('token', res?.data?.accessToken, {sameSite:'None', secure: true  })
                navigate('/dashboard')
            }else{
                navigate('/login')
            }

        })
        .catch(err => console.log('err',err))
    }
}
 
const handleEmail = (e) => {
    // console.log(e.target.value)
    setEmail(e.target.value);
}

const handlePassword = (e) => {
    // console.log(e.target.value)
    setPass(e.target.value);
}

    
  return (
    <div className='bg-slate-200'>
        <form >
            <div>
                <label className='mr-4'>Email</label>
                <input onChange={(e) => handleEmail(e)} type='email' value={email} placeholder='Enter your email here...' />
            </div>

            <div>
                <label className='mr-4'>Password</label>
                <input onChange={(e) => handlePassword(e)} type='password'value={pass} placeholder='Enter your password here...' />
            </div>

            <div>
                <button onClick={(e) => handleFormSubmit(e)} className='border-black bg-blue-400 p-3'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login