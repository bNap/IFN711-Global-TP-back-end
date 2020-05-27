const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)
    
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select * from users where username=${username} and password=${password}
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

const insertUser = (userData = {}) => {
    // const username = escape(userData.username)
    // const role = escape(userData.role)
    // const nickname = escape(userData.nickname)
    // let password = escape(userData.password)
    // password = genPassword(password)
    // const address = escape(userData.address)
    // const email = escape(userData.email)
    // const phone = escape(userData.phone)
    // const firstname = escape(userData.firstname)
    // const lastname = escape(userData.lastname)

    const username = userData.username
    const role = userData.role
    const rolename = userData.rolename
    let password = (userData.password)
    password = genPassword(password)
    const address = (userData.address)
    const email = (userData.email)
    const phone = (userData.phone)
    const firstname = (userData.firstname)
    const lastname = (userData.lastname)

    const sql = `
        insert into users (username, role, rolename, password, address, email, phone, firstname, lastname)
        values ('${username}', '${role}', '${rolename}', '${password}', '${address}', '${email}', '${phone}', '${firstname}', '${lastname}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const getUserInfo = () => {

    const sql = `
        select * from users order by experience desc;
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        return rows || {}
    })
}

const getCount = () => {
    const sql = `
        select count(1) from users;
    `
    return exec(sql)
}

// const updateUserInfo = (username, userData = {}) => {
const updateUserInfo = (userData = {}) => {
    // const nickname = escape(userData.nickname)
    // const password = escape(userData.password)
    // const address = escape(userData.address)
    // const email = escape(userData.email)
    // const phone = escape(userData.phone)
    // const firstname = escape(userData.firstname)
    // const lastname = escape(userData.lastname)
    // const experience = escape(userData.experience)
    const username = (userData.username)
    console.log("********************d**********")
    console.log(userData)
    console.log("********************d**********")
    const address = (userData.address)
    const email = (userData.email)
    const phone = (userData.phone)
    const firstname = (userData.firstname)
    const lastname = (userData.lastname)
    const image = (userData.image)
    const introduction = (userData.introduction)

    const title = (userData.title)
    const password = (userData.password)
    const experience = (userData.experience)
    const translation_num = (userData.translation_num)
    const review_num = (userData.review_num)
    const can_review = (userData.can_review)
    const status = (userData.status)
    let count = 0
    let sql = ` update users set `;
    if (title) {
        sql += `title='${title}'`
        count += 1
    }
    if (password) {
        if (count > 0) { sql += `, ` }
        sql += `password='${password}'`
        count += 1
    }    
    if (experience) {
        if (count > 0) { sql += `, ` }
        sql += `experience=experience+'${experience}'`
        count += 1
    }
    if (translation_num) {
        if (count > 0) { sql += `, ` }
        sql += `translation_num=translation_num+'${translation_num}'`
        count += 1
    }
    if (review_num) {
        if (count > 0) { sql += `, ` }
        sql += `review_num=review_num+'${review_num}'`
        count += 1
    }
    if (can_review) {
        if (count > 0) { sql += `, ` }
        sql += `can_review='${can_review}'`
        count += 1
    }
    if (status) {
        if (count > 0) { sql += `, ` }
        sql += `status='${status}'`
        count += 1
    }
    if (address) {
        if (count > 0) { sql += `, ` }
        sql += `address='${address}'`
        count += 1
    }
    if (email) {
        if (count > 0) { sql += `, ` }
        sql += `email='${email}'`
        count += 1
    }
    if (phone) {
        if (count > 0) { sql += `, ` }
        sql += `phone='${phone}'`
        count += 1
    }
    if (firstname) {
        if (count > 0) { sql += `, ` }
        sql += `firstname='${firstname}'`
        count += 1
    }
    if (lastname) {
        if (count > 0) { sql += `, ` }
        sql += `lastname='${lastname}'`
        count += 1
    }
    if (image) {
        if (count > 0) { sql += `, ` }
        sql += `image='${image}'`
        count += 1
    }
    if (introduction) {
        if (count > 0) { sql += `, ` }
        sql += `introduction='${introduction}'`
        count += 1
    }
    sql += `where username='${username}';`

    console.log("********************d**********")
    console.log(sql)
    console.log("********************d**********")

    return exec(sql).then(updateData => {
        if (updateData.affectedRows === 1) {
            return true
        }
        return false
    })
}

module.exports = {
    login,
    insertUser,
    getCount,
    getUserInfo,
    updateUserInfo
}