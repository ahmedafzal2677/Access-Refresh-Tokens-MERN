import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import axios from 'axios'

const SignUp = () => {

const [email,setEmail] = React.useState('')
const [pass,setPass] = React.useState('')
const navigate = useNavigate();


const handleFormSubmit =  async (e) => {
    e.preventDefault();
    console.log('handleFormSubmit')

    if(email && pass){
        const data = {
            email: email,
            password: pass
        }

        await axios.post('http://localhost:5000/signup',data)
        .then(res => {
            console.log('res',res?.data)
            navigate('/login')
        })
        .catch(err => console.log('err',err))
    }
}
 
const handleEmail = (e) => {
    setEmail(e.target.value);
}

const handlePassword = (e) => {
    setPass(e.target.value);
}

    
  return (
    <div className='bg-slate-200'>
        <form >
            <div>
                <label className='mr-4'>Email</label>
                <input onChange={(e) => handleEmail(e)} type='email' placeholder='Enter your email here...' />
            </div>

            <div>
                <label className='mr-4'>Password</label>
                <input onChange={(e) => handlePassword(e)} type='password' placeholder='Enter your password here...' />
            </div>

            <div>
                <button onClick={(e) => handleFormSubmit(e)} className='border-black bg-blue-400 p-3'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default SignUp