const xss = require('xss')
const { exec } = require('../db/mysql')

const getWaitingBooks = (name, original_id, original_language, target_language) => {
    let sql = `select * from trans_waiting_room where 1=1 `
    if (name) {
        sql += `and name like '%${name}%' `
    }
    if (original_id) {
        sql += `and original_id='${original_id}%' `
    }
    if (original_language) {
        sql += `and original_language='${original_language}' `
    }
    if (target_language) {
        sql += `and target_language=${target_language} `
    }

    console.log(sql)

    // 返回 promise
    return exec(sql)
}

const insertBook = (bookData = {}) => {
    const name = (bookData.name)
    const image = (bookData.image)
    const original_id = (bookData.original_id)
    const original_language = (bookData.original_language)
    const target_language = (bookData.target_language)

    const sql = `
        insert into trans_waiting_room (name, image, original_id, original_language, target_language)
        values ('${name}', '${image}', '${original_id}', '${original_language}', '${target_language}');
    `

    console.log(sql)

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const delBook = (id) => {
    const sql = `delete from trans_waiting_room where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const getCount = () => {
    const sql = `select count(*) from trans_waiting_room;`
    return exec(sql)
}


module.exports = {
    getWaitingBooks,
    insertBook,
    delBook,
    getCount
}