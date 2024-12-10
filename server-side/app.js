const express = require('express')
const cors = require('cors')
const routes = require('./route/signup.js')
const connectDB = require('./configDB/connectDB.js')
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))

app.use(routes)


app.listen(5000,() => {
    console.log('App listening on port: 5000')
})