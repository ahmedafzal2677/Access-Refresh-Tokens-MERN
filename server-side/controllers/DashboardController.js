const UserModel = require('../model/UserSchema');
const jwt = require('jsonwebtoken')
const express = require('express');
const bcrypt = require('bcrypt');
const e = require('express');


const signup = async (req,res) => {
  
    const { email, password } = req.body

    const salt = 15;
    const hashedPassword = await bcrypt.hash(password,salt)
    // console.log('hashedPassword',hashedPassword)

    const checkUserExists = await UserModel.findOne({ email: email })
    console.log('checkUserExists',checkUserExists)

    if(checkUserExists){
        res.status(409).json({'message':'User already exists'})
    }else{
        const user = new UserModel({
            email: email,
            password: hashedPassword
        })
        await user.save()
        .then(() => {console.log('User Succesfully Created!')})
        .catch(() => {console.log('Error Creating User!')})

        return res.json(user);
    }
}


const login =  async (req,res) => {

    
  
    const { email, password } = req.body

    const user = await UserModel.findOne({ email: email })

    try{
        if(user.email){
            const compareHashedPassword = await bcrypt.compare(password, user.password)

            if(compareHashedPassword){

                const data = { email: user?.email }
                
                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '30s'} )
                
                const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d'} )

                await UserModel.findOneAndUpdate(data,{
                    token: refreshToken
                })


                res.cookie('jwt',refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
                
                return res.status(200).json({
                    'message':'Login Successful',
                    'accessToken': accessToken 
                })
            }else{
                return res.status(404).json({'message':'Password Incorrect'})
            }
        }else{
            return res.status(404).json({'message':'User Not Found'})
        }

    }catch{
        return res.status(404).json({'message':'Incorrect Username/Password'})
    }

    // return res.json();

}



module.exports = { 
    login,
    signup
}