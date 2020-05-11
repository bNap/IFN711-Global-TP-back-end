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
    const author = req.query.author || ''
    const name = req.query.name || ''
    const language = req.query.category || ''
    const trans_num = req.query.trans_num || ''
    const status = req.query.status || ''

    const result = getOriginalBooks(name, author, language, trans_num, status)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/download', (req, res, next) => {
    const result = getDownload(req.query.id)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel(val)
            )
        } else {
            res.json(
                new ErrorModel('not found')
            )
        }
    })
});

// router.post('/add', loginCheck, (req, res, next) => {
    router.post('/add', (req, res, next) => {
        const result = insertBook(req.body)
        return result.then(data => {
            res.json(
                new SuccessModel(data)
            )
        })
    })

router.post('/update', (req, res, next) => {
// router.post('/update', adminCheck, (req, res, next) => {
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

router.post('/del', (req, res, next) => {
// router.post('/del', adminCheck, (req, res, next) => {
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
