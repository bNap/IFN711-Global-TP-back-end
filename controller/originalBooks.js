const xss = require('xss')
const { exec } = require('../db/mysql')

const getOriginalBooks = (name, author, language, trans_num, status) => {
    let sql = `select * from original_books where 1=1 `
    if (name) {
        sql += `and name like '%${name}%' `
    }
    if (author) {
        sql += `and author like '%${author}%' `
    }
    if (language) {
        sql += `and language='${language}' `
    }
    if (trans_num) {
        sql += `and trans_num >= ${trans_num} `
    }
    if (status) {
        sql += `and status=${status};`
    }

    console.log(sql)

    // 返回 promise
    return exec(sql)
}

const getDownload = (id) => {
    const sql = `select download_loc from original_books where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const insertBook = (bookData = {}) => {
    const name = (bookData.name)
    const image = (bookData.image)
    const author = (bookData.author)
    const language = (bookData.language)
    const download_loc = (bookData.download_loc)
    const publish_time = (bookData.publish_time)

    const sql = `
        insert into original_books (name, image, author, language, download_loc)
        values ('${name}', '${image}', '${author}', '${language}', '${download_loc}');
    `

    console.log(sql)

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBook = (bookData = {}) => {
    // const id = escape(bookData.id)
    // const trans_num = escape(bookData.trans_num)
    // const download_loc = escape(bookData.download_loc)
    // const status = escape(bookData.status)
    // const status_info = escape(bookData.status_info)
    const id = (bookData.id)
    const name = (bookData.name)
    const trans_num = (bookData.trans_num)
    const download_loc = (bookData.download_loc)
    const status = (bookData.status)
    const status_info = (bookData.status_info)
    const image = (bookData.image)
    let count = 0
    let sql = `update original_books set `
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
    if (image) {
        if (count > 0) { sql += `, ` }
        sql += `image='${image}'`
        count += 1
    }
    
    sql += `where id='${id}';`
    console.log(sql)

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBook = (id) => {
    const sql = `delete from original_books where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getOriginalBooks,
    getDownload,
    insertBook,
    updateBook,
    delBook
}