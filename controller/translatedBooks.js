const xss = require('xss')
const { exec } = require('../db/mysql')

const getTranslatedBooks = (original_id, language, translator_id, translation_reviewer_id, cultrue_reviewer_id, status) => {
    let sql = `select * from translated_books where 1=1 `
    if (original_id) {
        sql += `and original_id='${original_id}' `
    }
    if (language) {
        sql += `and language='${language}' `
    }
    if (translator_id) {
        sql += `and translator_id='${translator_id}%' `
    }
    if (translation_reviewer_id) {
        sql += `and translation_reviewer_id='${translation_reviewer_id}' `
    }
    if (cultrue_reviewer_id) {
        sql += `and cultrue_reviewer_id='${cultrue_reviewer_id}' `
    }
    if (status) {
        sql += `and status=${status} `
    }
    sql += `order by startdate desc;`

    console.log(sql)

    // 返回 promise
    return exec(sql)
}

const getDownload = (id) => {
    const sql = `select id, download_loc from translated_books where id='${id}';`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const insertBook = (bookData = {}) => {
    const translator_id = (bookData.translator_id)
    const original_id = (bookData.original_id)
    const name = (bookData.name)
    const language = (bookData.language)
    const startdate = (bookData.startdate)
    const image = (bookData.image)

    const sql = `
        insert into translated_books (original_id, startdate, name, language, image, translator_id)
        values ('${original_id}', '${startdate}', '${name}', '${language}', '${image}', '${translator_id}');
    `
    console.log(sql)

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBook = (bookData = {}) => {
    // trans_num = escape(trans_num)
    // const download_loc = escape(bookData.download_loc)
    // const status = escape(bookData.status)
    // const status_info = escape(bookData.status_info)
    const id = (bookData.id)
    const name = (bookData.name)
    const download_loc = (bookData.download_loc)
    const status = (bookData.status)
    const status_info = (bookData.status_info)
    const startdate = (bookData.startdate)
    const enddate = (bookData.enddate)
    const translation_reviewer_id = (bookData.translation_reviewer_id)
    const cultrue_reviewer_id = (bookData.cultrue_reviewer_id)
    const language = (bookData.language)
    const admin_id = (bookData.admin_id)
    const image = (bookData.image)
    let count = 0
    let sql = ` update translated_books set `
    if (trans_num) {
        sql += `trans_num='${trans_num}'`
        count += 1
    }
    if (name) {
        if (count > 0) { sql += `, ` }
        sql += `name='${name}'`
        count += 1
    }
    if (download_loc) {
        if (count > 0) { sql += `, ` }
        sql += `download_loc='${download_loc}'`
        count += 1
    }
    if (status) {
        if (count > 0) { sql += `, ` }
        sql += `status='${status}'`
        count += 1
    }
    if (status_info) {
        if (count > 0) { sql += `, ` }
        sql += `status_info='${status_info}'`
        count += 1
    }
    if (startdate) {
        if (count > 0) { sql += `, ` }
        sql += `startdate='${startdate}'`
        count += 1
    }
    if (enddate) {
        if (count > 0) { sql += `, ` }
        sql += `enddate='${enddate}'`
        count += 1
    }
    if (translation_reviewer_id) {
        if (count > 0) { sql += `, ` }
        sql += `translation_reviewer_id='${translation_reviewer_id}'`
        count += 1
    }
    if (cultrue_reviewer_id) {
        if (count > 0) { sql += `, ` }
        sql += `cultrue_reviewer_id='${cultrue_reviewer_id}'`
        count += 1
    }
    if (language) {
        if (count > 0) { sql += `, ` }
        sql += `language='${language}'`
        count += 1
    }
    if (admin_id) {
        if (count > 0) { sql += `, ` }
        sql += `admin_id='${admin_id}'`
        count += 1
    }
    if (image) {
        if (count > 0) { sql += `, ` }
        sql += `image='${image}'`
        count += 1
    }
    sql += `where id=${id};`

    console.log(sql)

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBook = (id) => {
    const sql = `delete from translated_books where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getTranslatedBooks,
    getDownload,
    insertBook,
    updateBook,
    delBook
}