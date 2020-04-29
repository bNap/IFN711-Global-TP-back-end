var express = require('express');
var router = express.Router();
const { login, insertUser, getUserInfo, updateUserInfo, updateUserExp } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { adminCheck, translatorCheck, translationReviewerCheck, copyReviewerCheck } = require('../middleware/roleCheck')

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.rolename = data.rolename
            req.session.id = data.id

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

router.post('/insertUser', (req, res, next) => {
    const result = insertUser(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// router.post('/updateInfo', (req, res, next) => {
router.post('/updateInfo', loginCheck, (req, res, next) => {
    const result = updateUserInfo(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/updateExp', adminCheck, (req, res, next) => {
// router.post('/updateExp', (req, res, next) => {
    const result = updateUserInfo(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

module.exports = router;