const UserModel = require('../../models/UserModel')
const UserService = {
    login: ({ username, password }) => {

        return UserModel.find({ username, password })
    },
    upload: (user) => {
        const { _id } = user
        return UserModel.updateOne({ _id }, user)
    },
    addUser: (user) => {
        UserModel.create(user)
    },
    userList: () => {
        return UserModel.find({}, ['username', 'gender', 'avatar', 'role'])
    },
    deleteUser: (_id) => {
        return UserModel.deleteOne({ _id })//细节,数据库中的字段是什么就填什么
    },
    updateUser: (user) => {
        const { _id } = user
        return UserModel.updateOne({ _id }, user)
    },
}

module.exports = UserService