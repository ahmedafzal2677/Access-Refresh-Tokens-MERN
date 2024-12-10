const express = require('express');
const Dashboard = require('../controllers/DashboardController')
const refreshController = require('../controllers/refreshTokenController')
const logoutController = require('../controllers/logoutController')
require('dotenv').config()
const verifyJWT = require('../middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
// const router = express.Router();


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

router
.route('/signup')
.post(Dashboard.signup)

router
.route('/login')
.post(Dashboard.login)


router
.route('/refresh')
.get(refreshController.handleRefereshToken)


router
.route('/logout')
.get(logoutController.logoutController)



router
.route('/xyz')
.get(verifyJWT, async (req, res) => {
  
    return res.json();

} )

module.exports = router;    










