const express = require('express');
const Dashboard = require('../controllers/DashboardController')
require('dotenv').config()
const router = express.Router();



router
.route('/login')
.post(Dashboard.login)