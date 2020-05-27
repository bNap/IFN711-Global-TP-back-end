var express = require('express');
var router = express.Router();
const { login, insertUser, getCount, getUserInfo, updateUserInfo, updateUserExp } = require('../controller/user')
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
            req.session.role = data.role
            req.session.userid = data.id

            console.log(req.session.userid)
            console.log(req.session.username)
            console.log(req.session.rolename)

            res.json(
                new SuccessModel(data, "login succeed")
            )
            return
        }
        res.json(
            new ErrorModel('login fail')
        )
    })
});

router.post('/insert', (req, res, next) => {
    const result = insertUser(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update', (req, res, next) => {
// router.post('/updateInfo', loginCheck, (req, res, next) => {
    const result = updateUserInfo(req.body)
    return result.then(data => {
        if (data) {
            res.json(
                new SuccessModel(data)
            )
        } else {
            res.json(
                new ErrorModel('update fail')
            )
        }
    })
});


router.get('/count', (req, res, next) => {
    const result = getCount()
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.get('/topN', (req, res, next) => {
    const result = getUserInfo()
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

// router.post('/updateExp', adminCheck, (req, res, next) => {
// router.post('/updateExp', (req, res, next) => {
//     const result = updateUserInfo(req.body)
//     return result.then(data => {
//         res.json(
//             new SuccessModel(data)
//         )
//     })
// });

module.exports = router;