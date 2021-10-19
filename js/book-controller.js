'use strict'
var gShowModal
var gChangePrice
const STAR_YELLOW = `<img src="./img_web/star-yellow.svg" alt="yellow-star">`
const STAR_RED = `<img src="./img_web/star-red.svg" alt="yellow-star">`
const SHOPPING_CART = `<img src="./img_web/buy.svg" alt="cart-shopping">`
const gElBtnOpenModal = document.querySelector('.login_open_modal ')
const gElBtnLogOut = document.querySelector('.logout_close_modal')
const gElConteinerLogin = document.querySelector('.login_modal')
const gElForAdminAddBook = document.querySelector('.add-book')
const gElBackgroundShowModals = document.querySelector('.background-show-in-modals')
const elmnt = document.querySelector('.shoping-cart-modal')

function init() {
    changeMuchBookOnPage()
    renderBooks()
    doTrans()

    elmnt.scrollIntoView()

}

function renderBooks() {
    var books = gettBooks()
    var elHTML = ''
    var showToAdmin = isNotAdmin()
    books.forEach(book => {
        elHTML += `<div class="card books-list shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
            <img class="card-img-top img-books" src="./img/${book.img}.jpg" alt="Card image cap">
            <div class="card-body">
            <div class="book-title">
                <h5 >${book.name}</h5>
                </div>
                <h6 class="card-text book-price">${book.price} <span data-trans="price"> &#36 </span> </h6>
                <div class="container-btn-books">                          
                <button onclick="onOpenModal('${book.id}')" class="btn btn-primary " data-trans="btn-open-modal-read"> Read</button>
                <button class="add_to_shop_cart btn btn-outline-success" onclick="onAddToShopingCart('${book.id}')" >${SHOPPING_CART}</button>
                <button class="buy_now btn btn-outline-success" onclick="onBuyNow('${book.id}')" data-trans="btn-book-buy-now"> Buy Now</button>
                <button  onclick="onUpdatePrice('${book.id}')" class="btn btn-primary btn-book-admin btn btn-warning  ${showToAdmin}" data-trans="btn-book-update"> Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="btn btn-primary btn-book-admin btn btn-danger ${showToAdmin}" data-trans="btn-book-delete"> Delete</button>
                </div>
            </div>
        </div>`
    });

    var elBook = document.querySelector('.books')
    elBook.innerHTML = elHTML
    doTrans()
}

function onSetLanguage(language) {
    updateLanguage(language)
    var elBody = document.querySelector('body')
    if (language === 'he') {
        elBody.classList.add('rtl')
    } else {
        elBody.classList.remove('rtl')
    }
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var elTrans = el.dataset.trans
        if (el.nodeName === 'INPUT') {
            el.placeholder = gettTrans(elTrans)
        } else {
            el.innerText = gettTrans(elTrans)
        }
    });
}


function onBuyNow(id) {
    onAddToShopingCart(id)
    onOpenCart()
}

function onOpenCart() {
    const elContainerShopping = document.querySelector('.shoping-cart-modal')
    elContainerShopping.hidden = !elContainerShopping.hidden
    randerShopingCart()

}

function onAddToShopingCart(id) {
    addToShopingCart(id)
    randerShopingCart()
}

function chackOutCart() {
    const elLoadingChackOut = document.querySelector('.loading-chackout')
    elLoadingChackOut.hidden = false
    setTimeout(function() {
        onOpenCart()
        elLoadingChackOut.hidden = true
        restartGItemCart()
        randerShopingCart()

    }, 2500)
}

function randerShopingCart() {
    const elContainerShopping = document.querySelector('.container-scroll-cart-modal')
    const elTotalChecOut = document.querySelector('.total-chack-out')

    var shoppingHTML = ''
    var counterTotal = 0
    var gItemsCart = gettGitemsCart()
    gItemsCart.forEach(obj => {
        var book = getBookById(obj.idUser)
        shoppingHTML += `<div class="container-shopping">
        
        <h5> ${book.name}</h5>
        <h6 >${book.price*obj.counter} <span data-trans="price"> &#36 </span>  </h6>
       <div class="change-amount-cart">
        <button class="btn-cart-plu-min" onclick="onChangeAmountCart(true,'${book.id}')">+ </button>
        <input class="num-phone" type="phone" placeholder="${obj.counter}">
        <button class="btn-cart-plu-min" onclick="onChangeAmountCart(false,'${book.id}')">- </button>
        </div>
        </div>`
        counterTotal += book.price * obj.counter
    })
    elContainerShopping.innerHTML = shoppingHTML
    elTotalChecOut.innerText = counterTotal
    doTrans()
}

function onChangeAmountCart(plusMin, id) {
    changeAmountCart(plusMin, id)
    randerShopingCart()
}



function onAddBook() {
    console.log('hallo');
    var elAddName = document.querySelector('.name-book-add')
    var elAddPrice = document.querySelector('.price-book-add')
    console.log(elAddPrice.value, elAddName.value);

    const regexNum = regex(1, elAddPrice.value)
    const regexWord = regex(2, elAddName.value)

    if (regexWord && regexNum) {
        createBookFromUser(elAddName.value, elAddPrice.value)
        renderBooks()
        elAddName.value = ''
        elAddPrice.value = ''
    }
}

function onUpdatePrice(book) {
    gChangePrice = book
    var elUpdatehide = document.querySelector('.enter-new-price')
    elUpdatehide.hidden = false
    gElBackgroundShowModals.hidden = false
}

function onEnterPrice() {
    var elUpdate = document.querySelector('.update-price-book')
    const regexNum = regex(1, elUpdate.value)

    if (regexNum) {
        updatePriceFromUser(gChangePrice, elUpdate.value)
        elUpdate.value = ''
        renderBooks()
        var elUpdatehide = document.querySelector('.enter-new-price')
        elUpdatehide.hidden = true
        gElBackgroundShowModals.hidden = true

    }
}

function onRemoveBook(id) {
    removeBookFromUser(id)
    renderBooks()
}

function onOpenModal(id) {
    gShowModal = id
    showModal(id)
}

function onRatePlus(idxBook) {
    const plus = true
    changeRate(plus, idxBook)
    showModal(gShowModal)
        // renderBooks() if you have rate on the books map you need this to refres
}

function onRateMin(idxBook) {
    const min = false
    changeRate(min, idxBook)
    showModal(gShowModal)
        // renderBooks() if you have rate on the books map you need this to refres
}

function closeModal() {
    var elModal = document.querySelector('.modal-about-book')
    elModal.hidden = true
}

function onSetSort(value) {
    sortBy(value)
    renderBooks()
}

function onMovePage(goTo) {
    nextPage(goTo)
    renderBooks()
}

function updateIdxShow() {
    var elNumPage = document.querySelector('.num-page')
    var str = pageIdx + 1
    elNumPage.innerText = '' + str
    elNumPage.style.fontSize = '25px'
    elNumPage.style.color = 'brown'
        //innerHTML TO CONTROLLER chack opt
}

function onContectUs() {
    var elUName = document.querySelector('.user-name')
    var elUMail = document.querySelector('.user-mail')
    var elUPhone = document.querySelector('.num-phone')

    const regexWord = regex(2, elUName.value)
    const regexPhone = regex(3, elUPhone.value)
    const regexMail = regex(4, elUMail.value)

    if (regexWord && regexMail && regexPhone) {
        createContect(elUName.value, elUMail.value, elUPhone.value)
        elUName.value = ''
        elUPhone.value = ''
        elUMail.value = ''
    }

}

//controler
function showModal(id) {
    var books = getBooks()
    var idxShow = books.findIndex(book => book.id === id)
        //find index - find change
    var book = books[idxShow];
    var elModal = document.querySelector('.modal-about-book')
    elModal.innerHTML = `<div class="name-book-modal">
    <h3> ${book.name}!</h3>
    </div>
    <div class="img-modal">
    <img src="./img/${book.img}.jpg" alt="">
    </div>
    <p>${book.descreption}</p>
    <div class="rate-book">
    <button onclick="onRatePlus(${idxShow})"><h5> &#9650;</h5></button>
    <button onclick="onRateMin(${idxShow})"><h5> &#9661; </h5></button>
    <div class="stars">${starRate(book.rate)}</div>
    <button class="close-modal" onclick="closeModal()" data-trans="close-modal">close</button>
    </div>`

    elModal.hidden = false;
    doTrans()
}

// controler
function starRate(rate) {
    var elHTML = ''
    var maxRate = 7;
    elHTML += STAR_RED.repeat(maxRate - rate)
    elHTML += STAR_YELLOW.repeat(rate)
    return elHTML
}

function showContect() {
    var elContect = document.querySelector('.container-online-contect')
    if (elContect.hidden) elContect.hidden = false
    else elContect.hidden = true

}


function onLogOut() {
    gElBtnOpenModal.style.display = 'block'
    gElBtnLogOut.hidden = true
    gElBtnLogOut.hidden = true
    gElForAdminAddBook.hidden = true

    logOut()
    renderBooks()
    saveToStorage(Users, gUsers)

}

function onLogOpenModal() {
    gElConteinerLogin.hidden = false
    gElBackgroundShowModals.hidden = false

}


function onLogInNow() {
    var elUserName = document.querySelector('.user_name')
    var elPassword = document.querySelector('.password')
    if (elUserName.value && elPassword.value) {
        var isUserOk = chackUserLog(elUserName, elPassword)
    }
    if (isUserOk) {
        elUserName.value = ''
        elPassword.value = ''
        gElConteinerLogin.hidden = true
        gElBtnOpenModal.style.display = 'none'
        if (!isNotAdmin()) {
            gElForAdminAddBook.hidden = false
        }
        gElBtnLogOut.hidden = false
        gElBackgroundShowModals.hidden = true
        renderBooks()
        saveToStorage(Users, gUsers)
    }
}
///need to delete just to show passord for visiters
setTimeout(function() {
    closeModalPassword()
}, 10000)

function closeModalPassword() {
    const elShowPassword = document.querySelector('.modal_show_password')
    elShowPassword.hidden = !elShowPassword.hidden

}