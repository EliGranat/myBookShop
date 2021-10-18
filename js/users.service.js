'use strict'
var gUsers = []
const Users = 'usersAndAdmin'
var gIdxConnect
var gIsAdmin = false;

createUsers()

function createUsers() {
    gUsers.push(createUser('e', '9', true))
    gUsers.push(createUser('g', 'h', false))
    saveToStorage(Users, gUsers)
}

function createUser(userName, password, isAdmin) {
    return {
        userName,
        password,
        isAdmin,
        isLog: false
    }
}

function chackUserLog(elUserName, elPassword) {
    var idx = gUsers.findIndex((user) => {
        return user.userName === elUserName.value && user.password === elPassword.value
    })
    if (idx !== -1) {
        gIdxConnect = idx
        gUsers[gIdxConnect].isLog = true
        if (gUsers[gIdxConnect].isAdmin) {
            gIsAdmin = true
        }
        return true
    }
    return false
}


function isNotAdmin() {
    if (!gIsAdmin) {
        return 'hide'
    }
}

function logOut() {
    gUsers[gIdxConnect].isLog = false
    gIsAdmin = false
}