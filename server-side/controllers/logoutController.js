const UserModel = require('../model/UserSchema')
const jwt = require('jsonwebtoken')

const logoutController =  async (req,res) => {
  
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(204)

    const refreshToken = cookies.jwt
    console.log('refreshToken/refresg',refreshToken)

    const { email, password } = req.body

    const user = await UserModel.findOne({ token: refreshToken })
    console.log('user', user?.token, user?.email)

    if(!user) {
        res.clearCookie('jwt', { httpOnly: true,  sameSite: 'None', secure: true})
        return res.status(204)
    };

    user.token = ''
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.status(204)

}

module.exports = { logoutController };