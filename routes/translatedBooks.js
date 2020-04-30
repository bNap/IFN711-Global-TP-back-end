var express = require('express');
var router = express.Router();
const {
    getTranslatedBooks,
    getDownload,
    insertBook,
    updateBook,
    delBook
} = require('../controller/translatedBooks')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { adminCheck, translatorCheck, translationReviewerCheck, copyReviewerCheck } = require('../middleware/roleCheck')

router.get('/list', (req, res, next) => {
    const original_id = req.query.original_id || ''
    const language = req.query.language || ''
    const translator_id = req.query.translator_id || ''
    const translation_reviewer_id = req.query.translation_reviewer_id || ''
    const cultrue_reviewer_id = req.query.cultrue_reviewer_id || ''
    const status = req.query.status || ''

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

    const result = getTranslatedBooks(original_id, language, translator_id, translation_reviewer_id, cultrue_reviewer_id, status)
    return result.then(listData => {
        console.log(listData)
        res.json(            
            new SuccessModel(listData)
        )
    })
});

router.get('/download', loginCheck, (req, res, next) => {
    const result = getDownload(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/add', loginCheck, (req, res, next) => {
// router.post('/add', (req, res, next) => {
    // *****also need to update the original table*****
    translator_id = req.session.id
    const result = insertBook(translator_id, req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
// router.post('/update', (req, res, next) => {
    const result = updateBook(req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('update fail')
            )
        }
    })
})

router.post('/del', adminCheck, (req, res, next) => {
// router.post('/del', (req, res, next) => {
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
