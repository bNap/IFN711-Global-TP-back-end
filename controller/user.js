const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)
    
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select username, rolename, id from users where username=${username} and password=${password}
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
    const nickname = userData.nickname
    let password = (userData.password)
    password = genPassword(password)
    const address = (userData.address)
    const email = (userData.email)
    const phone = (userData.phone)
    const firstname = (userData.firstname)
    const lastname = (userData.lastname)


    const sql = `
        insert into users (username, role, rolename, nickname, password, address, email, phone, firstname, lastname)
        values ('${username}', '${role}', '${rolename}', '${nickname}', '${password}', '${address}', '${email}', '${phone}', '${firstname}', '${lastname}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const getUserInfo = (username) => {
    username = escape(username)

    const sql = `
        select * from users where username=${username};
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
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
    const nickname = (userData.nickname)
    const password = (userData.password)
    const address = (userData.address)
    const email = (userData.email)
    const phone = (userData.phone)
    const firstname = (userData.firstname)
    const lastname = (userData.lastname)
    const experience = (userData.experience)
    let count = 0
    let sql = ` update users set `;
    if (nickname) {
        sql += `nickname='${nickname}'`
        count += 1
    }
    if (password) {
        if (count > 0) { sql += `, ` }
        sql += `password='${password}'`
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
    if (experience) {
        if (count > 0) { sql += `, ` }
        sql += `experience=experience+'${experience}'`
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
    getUserInfo,
    updateUserInfo
}