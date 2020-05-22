var express = require('express');
var router = express.Router();
const {
    getOriginalBooks,
    getInfo,
    getCount,
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
    const level = req.query.level || ''
    const content_pill = req.query.content_pill || ''
    const type = req.query.type || ''
    const keywords = req.query.keywords || ''

    const result = getOriginalBooks(name, author, language, trans_num, status, level, content_pill, type, keywords)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/info', (req, res, next) => {
    const result = getInfo(req.query.id)
    return result.then(listData => {
        if(listData) {            
            res.json(
                new SuccessModel(listData)
            )
        } else {res.json(
            new ErrorModel('not found'))
        }
    })
});

router.get('/count', (req, res, next) => {
    const result = getCount()
    return result.then(listData => {            
        res.json(
            new SuccessModel(listData)
        )
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
