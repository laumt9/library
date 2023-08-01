const library = document.querySelector('.library');
const addBookBtn = document.getElementById("addBookBtn");
const addBookForm = document.getElementById("addBookForm");

const myLibrary = [];

// Object constructor
function Book(title, author, pages, read) { //Constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Triggers the popup form to display
addBookBtn.addEventListener('click', function() {
    addBookForm.style.display = "block";
});

// Calls function to add book to library and resets form
addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
    addBookForm.reset();
    addBookForm.style.display = "none";
});
    
// Adds user input to the library 
function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let book = new Book(title, author, pages, read);

    myLibrary.push(book);
    console.log(myLibrary);
    displayMyLibrary();
};

// Displays books in library
function displayMyLibrary () {
    library.textContent = '';
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    });
    removeBook();
    updateStatus();
    updateCounter();
};

// Renders card for user inputted books
function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('id', index);
    bookCard.classList.add('bookCard');

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');

    const bookEdit = document.createElement('div');
    bookEdit.classList.add('bookEdit');

    const bookSwitch = document.createElement('label');
    bookSwitch.classList.add('switch');

    let bookCheckbox = document.createElement('input');
    bookCheckbox.setAttribute('id', index);
    bookCheckbox.setAttribute('type', 'checkbox');
    bookCheckbox.classList.add('bookCheckbox');
    bookCheckbox.checked = book.read;
    bookSwitch.append(bookCheckbox);

    const bookSlider = document.createElement('span');
    bookSlider.classList.add('slider', 'round');
    bookSwitch.append(bookSlider);

    const bookButton = document.createElement('button')
    bookButton.setAttribute('id', index);
    bookButton.classList.add('removeCard');
    bookButton.innerHTML = `<span>&times;</span>`;
    
    bookEdit.append(bookSwitch);
    bookEdit.append(bookButton);
    bookInfo.append(bookEdit);

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('bookTitle');
    bookTitle.innerText = book.title;
    bookInfo.append(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.innerText = book.author;
    bookInfo.append(bookAuthor);

    const bookPages = document.createElement('p');
    bookPages.classList.add('bookPages');
    bookPages.innerHTML = `${book.pages} pages`;
    bookInfo.append(bookPages);

    const bookStatus = document.createElement('p');
    bookStatus.classList.add('bookStatus');
        if (book.read) {
            bookStatus.innerText = 'Status: Completed';
            bookStatus.style.color = 'Green';
        } else {
            bookStatus.innerText = 'Status: Incomplete';
            bookStatus.style.color = 'Red';
        }
    bookInfo.append(bookStatus);

    bookCard.append(bookInfo);
    library.appendChild(bookCard);
};

// Adds event listener to remove book card from library
function removeBook() {
    const removeCard = document.querySelectorAll('.removeCard');
    removeCard.forEach((button) => {
        button.addEventListener('click', () => {
            myLibrary.splice(button.getAttribute('id'), 1);
            console.log(myLibrary);
            displayMyLibrary();
        });
    });
};

// Toggle read/not read for slider
function updateStatus() {
    let bookCheckbox = document.querySelectorAll('.bookCheckbox');
    bookCheckbox.forEach((checkbox) => {
        checkbox.addEventListener('click', (update) => {
            const bookIndex = checkbox.getAttribute('id');
            const readValue = checkbox.checked;
            update = Object.create(Book.prototype);
            update.updateStatus(bookIndex, readValue);
            displayMyLibrary();
        });
    });
};

//Updates book in the array
Book.prototype.updateStatus = function (index, value) {
    myLibrary[index].read = value;
};

//Updates book counter
function updateCounter() {
    const bookCounter = document.querySelector('.bookCounter')
    bookCounter.innerText = ('Books in Library: ' + myLibrary.length)
};