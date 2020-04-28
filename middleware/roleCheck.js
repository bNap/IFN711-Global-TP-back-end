const { ErrorModel } = require('../model/resModel')

const adminCheck = (req, res, next) => {
    if (req.session.rolename === 'admin') {
        next()
        return
    }
    res.json(
        new ErrorModel('role error')
    )
}

const translatorCheck = (req, res, next) => {
    if (req.session.rolename === 'translator') {
        next()
        return
    }
    res.json(
        new ErrorModel('role error')
    )
}

const translationReviewerCheck = (req, res, next) => {
    if (req.session.rolename === 'translationReviewer') {
        next()
        return
    }
    res.json(
        new ErrorModel('role error')
    )
}

const copyReviewerCheck = (req, res, next) => {
    if (req.session.rolename === 'copyReviewer') {
        next()
        return
    }
    res.json(
        new ErrorModel('role error')
    )
}

module.exports = {
    adminCheck,
    translatorCheck,
    translationReviewerCheck,
    copyReviewerCheck
}