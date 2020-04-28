const xss = require('xss')
const { exec } = require('../db/mysql')

const getOriginalBooks = (name, author, publisher, category, trans_num) => {
    let sql = `select * from original_book where 1=1 `
    if (name) {
        sql += `and name like '%${name}' `
    }
    if (author) {
        sql += `and author like '%${author}' `
    }
    if (publisher) {
        sql += `and publisher like '%${publisher}%' `
    }
    if (category) {
        sql += `and category='${category}' `
    }
    if (trans_num) {
        sql += `and trans_num > ${trans_num} `
    }
    sql += `order by publish_time desc;`

    // 返回 promise
    return exec(sql)
}

const getDownload = (id) => {
    const sql = `select id, download from original_book where id='${id}';`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const insertBook = (bookData = {}) => {
    const name = escape(bookData.name)
    const startdate = escape(bookData.author)
    const language = escape(bookData.language)
    const translator_id = escape(bookData.translator_id)

    const sql = `
        insert into translated_books (name, startdate, language,  translator_id)
        values ('${name}', '${startdate}', '${language}', '${translator_id}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBook = (name, trans_num, bookData = {}) => {
    const trans_num = escape(trans_num)
    const download_loc = escape(bookData.download_loc)
    const status = escape(bookData.status)
    const status_info = escape(bookData.status_info)
    let count = 0
    const sql = `
        update original_books set `
        if (count) {
            sql += `trans_num='${trans_num}'`
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
        sql += `where id=${id};`


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
    getOriginalBooks,
    getDownload,
    insertBook,
    updateBook,
    delBook
}