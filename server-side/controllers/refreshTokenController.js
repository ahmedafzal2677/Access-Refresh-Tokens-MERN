const UserModel = require('../model/UserSchema')
const jwt = require('jsonwebtoken')

const handleRefereshToken =  async (req,res) => {
  
    const cookies = req.cookies
    console.log('cookies',cookies)
    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt
    console.log('refreshToken/refresh',refreshToken)

    // const { email, password } = req.body

    const user = await UserModel.findOne({ token: refreshToken })
    console.log('user', user?.token, user?.email)

    if(!user) return res.sendStatus(403);
    const data = { email: user?.email}

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                data,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }

            )

            res.json({ accessToken })
        }
    )

}

module.exports = { handleRefereshToken };