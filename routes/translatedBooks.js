var express = require('express');
var router = express.Router();
const {
    getOriginalBooks,
    getDownload,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/originalBooks')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const name = req.query.name || ''
    const publisher = req.query.publisher || ''
    const category = req.query.category || ''
    const trans_num = req.query.trans_num || ''

    if (req.query.isadmin) {
        // 管理员界面
        if (req.session.username == null) {
            console.error('is admin, but no login')
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 强制查询自己的博客
        author = req.session.username
    }

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

router.post('/uploadOri', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = uploadOri(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/uploadTrans', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = uploadTrans(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})

module.exports = router;
