'use strict'
function onInit(ev) {
    initBooks()
    renderBooks()
}
function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        var newStr = `<tr>
            <td class="id">${book.id}</td> 
            <td class="name">${book.name}</td>
            <td class="price">${formatCurrency(book.price)}</td>  
            <td class="image"><img src="${book.imgUrl}" alt="${books.name}"></td> 
            <td class="actions">`
        if (gCurrLang === 'en') {
            newStr += `
            <button data-trans="read" onclick="onReadBook('${book.id}')">read</button>
            <button data-trans="update" onclick="onUpdateBook('${book.id}')">update</button>
            <button data-trans="delete" onclick="onDeleteBook('${book.id}')">delete</button>
            </td>
            </tr>`}

            else{ newStr += `
            <button data-trans="read" onclick="onReadBook('${book.id}')">קרא</button>
            <button data-trans="update" onclick="onUpdateBook('${book.id}')">עדכן</button>
            <button data-trans="delete" onclick="onDeleteBook('${book.id}')">מחק</button>
            </td>
            </tr>`}
        return newStr
    })
    document.querySelector('.books-body').innerHTML = strHtmls.join('')
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.setAttribute("dir","rtl");
    else document.body.removeAttribute("dir","rtl" )
    doTrans();
    renderBooks();
}
function onReadBook(bookId) {
    var book = getBookById(bookId)
    renderModal(book)

}
function onUpdateBook(bookId) {
    var price = +prompt('please enter the new price')
    updateBook(bookId, price)
    renderBooks()
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}

function onAddBook() {
    var name = prompt(`please enter the book's name`);
    var price = +prompt('please enter the books price');
    addBook(name, price);
    renderBooks();
}

function onChangeRate(changeBy, bookId) {
    changeRate(changeBy, bookId);
    var book = getBookById(bookId);
    renderModal(book);
}
function renderModal(book) {
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price
    elModal.querySelector('.rating').innerHTML = `<button onclick="onChangeRate(1,'${book.id}')">+</button>${book.rate} 
        <button onclick="onChangeRate(-1,'${book.id}')">-</button>`
    elModal.hidden = false
}
function onCloseModal() {
    document.querySelector('.modal').hidden = true
}