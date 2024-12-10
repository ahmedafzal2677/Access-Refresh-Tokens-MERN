const mongoose = require('mongoose')

const user = new mongoose.Schema({
    email: String,
    password: String,
    token: String
})

const UserModel = mongoose.model('users',user)

module.exports = UserModel;
