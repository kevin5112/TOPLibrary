let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.info = function () {
    console.log(
      `Book: ${this.title}, Author: ${this.author}, Pages: ${this.author}, Pages: ${this.pages}, HasRead: ${this.hasRead}`
    );
  };
}

function initLibrary() {
  let book1 = new Book('the book', 'charles', 234, false);
  let book2 = new Book('the wood', 'jimmy', 42, true);
  myLibrary.push(book1);
  myLibrary.push(book2);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook() {
  const library = document.querySelector('.bookGrid');
  //   console.log(library);

  myLibrary.forEach((book) => {
    // console.log(book);
    let newBook = document.createElement('div');
    newBook.className = 'book';

    newBook.appendChild(addBookFields('h3', 'title', book.title));
    newBook.appendChild(addBookFields('h4', 'author', book.author));
    newBook.appendChild(addBookFields('p', 'pages', book.pages));
    newBook.appendChild(addBookFields('p', 'hasRead', book.hasRead));

    library.appendChild(newBook);
  });
}

function addBookFields(type, className, content) {
  let element = document.createElement(type);
  element.className = className;
  element.textContent = content;
  return element;
}

initLibrary();

let addBookBtn = document.querySelector('.addBookBtn');
let bookModal = document.querySelector('.addBookModal');
addBookBtn.addEventListener('click', () => {
  bookModal.showModal();
});

bookModal.addEventListener('click', (e) => {
  if (e.target.nodeName === 'DIALOG') {
    bookModal.close();
  }
});

let submitBtn = document.querySelector('.modalButton');
submitBtn.addEventListener('click', () => {
  let inputTitle = document.querySelector('.inputTitle').value;
  let inputAuthor = document.querySelector('.inputAuthor').value;
  let inputPages = document.querySelector('.inputPages').value;
  let hasReadCheckbox = document.querySelector('.hasReadCheckbox').checked;
  let newBook = new Book(inputTitle, inputAuthor, inputPages, hasReadCheckbox);
  console.log(newBook);
  addBookToLibrary(newBook);
  displayBook();
  clearInputs();
});

function clearInputs() {
  document.querySelector('.inputTitle').value = '';
  document.querySelector('.inputAuthor').value = '';
  document.querySelector('.inputPages').value = '';
  document.querySelector('.hasReadCheckbox').checked = false;
}

displayBook();
