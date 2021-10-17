'use strict';
// model all the function thet react to the control and let him services
const KEY = 'booksSave'
var gSizePage = 6
var pageIdx = 0
var gBooks;
var gSortBy = 'SORT'
var gConnectUs = []
    // we need to check this:
    // saveToStorage(KEY, _getBookName())
_createBooks()

function getBookById(idUser) {
    var book = gBooks.find(book => book.id === idUser)
    return book
}

function changeMuchBookOnPage() {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    if (width > 992) {
        gSizePage = 12;
    }
}

function nextPage(naxtOrBack) {

    if (naxtOrBack) {
        pageIdx++
        if (pageIdx * gSizePage >= gBooks.length) {
            pageIdx = 0
        }
        return
    }
    pageIdx--
    if (pageIdx * gSizePage <= 0) {
        pageIdx = 0
    }
}

function gettBooks() {
    updateIdxShow()
    var books = gBooks
    const fromIndex = pageIdx * gSizePage
    books = books.slice(fromIndex, fromIndex + gSizePage)
    return books
}

function getBooks() {
    return gBooks
}

function _getBookName() {
    return makeLorem(7)
}

function _createBooks() {
    var books = loadFromStorage(KEY)

    if (!books || !books.length) {
        books = []

        for (var i = 0; i < 60; i++) {
            books.push(_createBook(_getBookName(), getRandomInt(100, 130), i < 12 ? i : undefined))
        }
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _createBook(name, price, img = getRandomInt(1, 12)) {
    return {
        id: makeId(),
        name,
        price,
        img,
        rate: getRandomInt(1, 7),
        descreption: makeLorem(15)
    }
}

function createBookFromUser(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()

}

function updatePriceFromUser(id, newPrice) {
    gBooks.find(book => book.id === id).price = newPrice
    _saveBooksToStorage()

}

function removeBookFromUser(id) {
    var removeBookId = gBooks.findIndex(book => book.id === id)
    gBooks.splice(removeBookId, 1)
    _saveBooksToStorage()
}

// service
function changeRate(plusMin, idxBook) {
    var book = gBooks[idxBook]

    if (plusMin && book.rate < 7) {
        book.rate++
            _saveBooksToStorage()
        return

    } else if (!plusMin && book.rate > 0) {
        book.rate--
            _saveBooksToStorage()
        return
    }
}

function sortBy(by) {
    gSortBy = by
    setSort(gSortBy)
}

function setSort(sortBy) {

    if (gBooks <= 1) return
    if (sortBy === ('SORT')) return

    switch (sortBy) {
        case 'NAME':
            gBooks.sort((a, b) => { return a.name < b.name ? 1 : -1 })
            gSortBy = 'NAME'
            break;
        case 'PRICE':
            gBooks.sort((a, b) => a.price - b.price)
            gSortBy = 'PRICE'
            break;
        default:
            break;
    }
    _saveBooksToStorage()
    return
}

function createContect(name, mail, phone) {
    var user = {
        name,
        mail,
        phone
    }
    createContects(user)
}

function createContects(user) {
    gConnectUs.push(user)
    saveToStorage('users', gConnectUs)
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}
// console.log(regex(5, 'asdf1A1'));
// console.log(regex(6, 'hdguh$10ggDDhsd'));

function regex(check, item) {
    const regexNum = /^[0-9]+$/g
    const regexWord = /^[a-zA-Z ,.'-]+$/g
    const regexPhone = /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0\d{1,2}))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/g
    const regexMail = /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    const regexUserName = /^[a-zA-Z0-9]+[._]?[a-zA-Z0-9]+$/g
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    if (check === 1) return regexNum.test(item)
    else if (check === 2) return regexWord.test(item)
    else if (check === 3) return regexPhone.test(item)
    else if (check === 4) return regexMail.test(item)
    else if (check === 5) return regexUserName.test(item)
    else if (check === 6) return regexPassword.test(item)
}