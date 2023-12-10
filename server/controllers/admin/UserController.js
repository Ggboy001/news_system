const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
    login: async (req, res) => {

        const result = await UserService.login(req.body)
        if (result.length === 0) {
            res.json({
                code: "-1",
                message: '用户名密码不匹配'
            })
        }
        else {
            //在这里产生token
            const token = JWT.generateToken({
                id: result[0]._id
            }, '1d')
            //并通过响应头来返回token,一般固定这么写
            res.header("Authorization", token)
            res.send({
                username: result[0].username,
                gender: result[0].gender ? result[0].gender : 0,
                introduction: result[0].introduction,//简介
                avatar: result[0].avatar,
                role: result[0].role//0管理员,1编辑
            })
        }
    },
    upload: async (req, res) => {
        const token = req.headers['authorization'].split(' ')[1]//竟然被这个引号问题卡这么久
        const payload = JWT.verifyToken(token)
        const { username, introduction, gender } = req.body
        //拿到头像在服务器中的命名名称方便拼接资源
        const avatar = `/avataruploads/${req.file.filename}`

        await UserService.upload({ _id: payload.id, username, introduction, gender: Number(gender), avatar })
        res.send({
            actionType: 'ok',
            data: {
                username, introduction, gender: Number(gender),
                avatar
            }
        })
    },
    addUser: async (req, res) => {

        await UserService.addUser(req.body)
        res.json({
            code: 200,
            message: '我成功了'
        })
    },
    userList: async (req, res) => {

        let userList = await UserService.userList()
        res.json({
            code: 200,
            message: '我成功了',
            data: userList
        })
    },
    deleteUser: async (req, res) => {
        await UserService.deleteUser(req.params.id)
        res.json({
            code: 200,
            message: '我成功'
        })
    },
    updateUser: async (req, res) => {
        await UserService.updateUser(req.body)
        res.json({
            code: 200,
            message: '我成功了'
        })
    }

}
module.exports = UserController