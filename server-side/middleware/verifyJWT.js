const jwt = require('jsonwebtoken')
require('dotenv').config();


const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    console.log('headers:',authHeader)
    // console.log('All headers:',req.headers)
    // console.log('reeqq:',req)
    
    if(!authHeader) return res.status(401).json({'message':"Unauthorized"})

    const token = authHeader.split(' ')[1]
    console.log('verifyJWT Token:',token)

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => { 
                if(err){
                    console.log('jwt err',err)
                    return res.sendStatus(401)
                }
                // jwt.sign()
                // req.user = decoded.user
                next();
            }
        )

}

module.exports = verifyJWT;