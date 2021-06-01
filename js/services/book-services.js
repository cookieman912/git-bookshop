'use strict'
const BOOK_KEY = 'books';

var gBooks;

function initBooks() {
    _createBooks()
}


function createBook(name, price, imgUrl) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    }
    return book;
}

function addBook(name, price) {
    var newBook = createBook(name, price, 'img/default.jpeg');
    gBooks.unshift(newBook);
    _saveBooks();
}
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    return book;
}
function updateBook(id, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return id === book.id
    })
    gBooks[bookIdx].price = price;
    _saveBooks();
    console.log(gBooks[bookIdx].price);

}
function deleteBook(id) {
    var bookIdx = gBooks.findIndex(function (book) {
        return id === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooks();
}
function changeRate(changeBy, id) {

    var bookIdx = gBooks.findIndex(function (book) {
        return id === book.id
    })
    if ((changeBy === 1 && gBooks[bookIdx].rate === 10) || (changeBy === -1 && gBooks[bookIdx].rate === 0)) return;
    gBooks[bookIdx].rate += changeBy;
    _saveBooks();

}

function _createBooks() {
    var books = _loadBooks();
    if (!books || !books.length) {
        books = [
            createBook('Harry Potter', 120, 'img/hp.jpg'),
            createBook('Lord of the rings', 100, 'img/lotr.jpg'),
            createBook('The Little Prince', 80, 'img/littleprince.jpg')
        ]

    }
    gBooks = books;
    _saveBooks()
}
function getBooks() {
    return gBooks
}

function _saveBooks() {
    saveToStorage(BOOK_KEY, gBooks)
}


function _loadBooks() {
    return loadFromStorage(BOOK_KEY)

}