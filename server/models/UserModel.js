

const mongoose = require('mongoose')


const userType = {
    username: String,
    password: String,
    gender: Number,
    introduction: String,//简介
    avatar: String,
    role: Number//0管理员,1编辑

}

const UserModel = mongoose.model('user', new mongoose.Schema(userType))
module.exports = UserModel