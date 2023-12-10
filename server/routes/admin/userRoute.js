
var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/admin/UserController')
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
//login
router.post('/adminapi/user/login', UserController.login);


router.post('/adminapi/user/upload', upload.single('file'), UserController.upload);

//用户添加
router.post('/adminapi/user/add', UserController.addUser);
//用户列表
router.get('/adminapi/user/list', UserController.userList)
//用户删除
router.delete('/adminapi/user/:id', UserController.deleteUser)
//用户更新
router.put('/adminapi/user/list', UserController.updateUser)
module.exports = router;
