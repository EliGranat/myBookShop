'use strict'
var gShowModal
var gChangePrice

function init() {
    changeMuchBookOnPage()
    renderBooks()
        // onKeyPress={this.handleChange}
        // handleChange: function(e) {
        //     if (e.key == 'Enter') {
        //       console.log('test');
        //     }
}

function runScript(ev, item) {
    console.log(ev.key, item);
}

function renderBooks() {

    var books = gettBooks()
    console.log(books);
    var elHTML = ''
    books.forEach(book => {
        elHTML += `<div class="card books-list shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
            <img class="card-img-top img-books" src="./img/${book.img}.jpg" alt="Card image cap">
            <div class="card-body">
            <div class="book-title">
                <h5 >${book.name}</h5>
                </div>
                <h6 class="card-text book-price">${book.price} &#36</h6>
                <div class="container-btn-books">
                <button onclick="onOpenModal('${book.id}')" class="btn btn-primary btn-book"> openModal</button>
                <button onclick="onUpdatePrice('${book.id}')" class="btn btn-primary btn-book"> Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="btn btn-primary btn-book"> Delete</button>
                </div>
            </div>
        </div>`
    });

    var elBook = document.querySelector('.books')
    elBook.innerHTML = elHTML
}

function onAddBook() {
    var elAddName = document.querySelector('.name-book')
    var elAddPrice = document.querySelector('.price-book')

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
    }
}

function onRemoveBook(id) {
    removeBookFromUser(id)
    renderBooks()
}

function onOpenModal(id) {
    gShowModal = id
    showModal(id)
        // console.log(book);
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
        // renderBooks() if you have rate on the books map you need this to refres

    showModal(gShowModal)
}

function closeModal() {
    var elModal = document.querySelector('.modal-about-book')
    elModal.hidden = true
}

function onSetSort(value) {
    console.log();
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
        //innerHTML TO CONTROLLER
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
        //find index - find
    var book = books[idxShow];
    var elModal = document.querySelector('.modal-about-book')
    elModal.innerHTML = `<div class="name-book-modal">
    <h3> ${book.name}!</h3>
    </div>
    <div class="img-modal">
    <img src="./img/${book.img}.jpg" alt="">
    </div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quas illo molestiae veritatis, dolores quae.</p>
    <div class="rate-book">
    <button onclick="onRatePlus(${idxShow})"><h5> &#9650;</h5></button>
    <button onclick="onRateMin(${idxShow})"><h5> &#9661; </h5></button>
    <div class="stars">${starRate(book.rate)}</div>
    <button class="close-modal" onclick="closeModal()">close</button>
    </div>`

    elModal.hidden = false;
}

// controler
function starRate(rate) {
    console.log(rate);
    var elHTML = ''
    var maxRate = 7;

    if (maxRate - rate) {
        maxRate -= rate
        for (var i = 0; i < maxRate; i++) {
            elHTML += STAR_RED
        }
    }
    for (var i = 0; i < rate; i++) {
        elHTML += STAR_YELLOW
    }
    return elHTML
}