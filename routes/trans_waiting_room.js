var express = require('express');
var router = express.Router();
const {
    getWaitingBooks,
    insertBook,
    delBook
} = require('../controller/trans_waiting_room')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const { adminCheck, translatorCheck, translationReviewerCheck, copyReviewerCheck } = require('../middleware/roleCheck')

router.get('/list', (req, res, next) => {
    const name = req.query.name || ''
    const original_id = req.query.original_id || ''
    const original_language = req.query.original_language || ''
    const target_language = req.query.target_language || ''

    const result = getWaitingBooks(name, original_id, original_language, target_language)
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
