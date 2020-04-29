var express = require('express');
var router = express.Router();
const {
    getOriginalBooks,
    getDownload,
    insertBook,
    updateBook,
    delBook
} = require('../controller/originalBooks')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { adminCheck, translatorCheck, translationReviewerCheck, copyReviewerCheck } = require('../middleware/roleCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const name = req.query.name || ''
    const publisher = req.query.publisher || ''
    const category = req.query.category || ''
    const trans_num = req.query.trans_num || ''

    // if (req.query.isadmin) {
    //     // 管理员界面
    //     if (req.session.username == null) {
    //         console.error('is admin, but no login')
    //         // 未登录
    //         res.json(
    //             new ErrorModel('未登录')
    //         )
    //         return
    //     }
    //     // 强制查询自己的博客
    //     author = req.session.username
    // }

    const result = getOriginalBooks(name, author, publisher, category, trans_num)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/download', (req, res, next) => {
    const result = getDownload(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

// router.post('/update', (req, res, next) => {
router.post('/update', adminCheck, (req, res, next) => {
    const result = updateBook(req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('upload fail')
            )
        }
    })
})

router.post('/del', adminCheck, (req, res, next) => {
    const result = delBook(req.body.id)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('delete fail')
            )
        }
    })
})

module.exports = router;
