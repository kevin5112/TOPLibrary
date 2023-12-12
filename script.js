const myLibrary = [];

const booksGrid = document.getElementById('booksGrid');
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');
const submitBookBtn = document.getElementById('submitBookBtn');
const overlay = document.getElementById('overlay');

addBookBtn.addEventListener('click', () => {
  addBookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
});

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
};

overlay.addEventListener('click', () => {
  CloseBookModal();
});

function CloseBookModal() {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
}

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.hasRead ? 'Read already' : 'Not Read'
      }`
    );
  };
}

const addBook = (e) => {
  e.preventDefault();
  console.log(addBookForm.title.value);
  console.log(addBookForm.author.value);
  console.log(addBookForm.pages.value);
  console.log(addBookForm.hasRead.checked);
  let newBook = new Book(
    addBookForm.title.value,
    addBookForm.author.value,
    addBookForm.pages.value,
    addBookForm.hasRead.checked
  );
  addBookToLibrary(newBook);
  closeAddBookModal();
};

addBookForm.onsubmit = addBook;

function createDialog() {
  let dialogBox = document.createElement('dialog');
  let closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  dialogBox.appendChild(closeButton);
  return dialogBox;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateBookGrid();
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    book.info();
  });
}

function updateBookGrid() {
  resetBookGrid();
  for (let book of myLibrary) {
    createBookCard(book);
  }
}

function resetBookGrid() {
  booksGrid.innerHTML = '';
}

function createBookCard(book) {
  let bookCard = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let pages = document.createElement('p');
  let btnGroup = document.createElement('div');
  let readBtn = document.createElement('button');
  let removeBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  title.classList.add('book-title');
  author.classList.add('book-author');
  pages.classList.add('book-pages');
  btnGroup.classList.add('book-btn-group');
  readBtn.classList.add('btn');
  removeBtn.classList.add('btn');
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  if (book.hasRead) {
    readBtn.textContent = 'Has Read';
    readBtn.classList.add('book-btn-green');
  } else {
    readBtn.textContent = 'Not Read';
    readBtn.classList.add('book-btn-red');
  }

  removeBtn.textContent = 'Remove';

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(btnGroup);
  // future test for order of appending?
  btnGroup.appendChild(readBtn);
  btnGroup.appendChild(removeBtn);

  booksGrid.appendChild(bookCard);
}

function getBook(title) {
  return myLibrary.find((book) => book.title === title);
}

const removeBook = (e) => {
  let title =
    e.target.parentElement.parentElement.firstChild.innerHTML.replaceAll(
      '"',
      ''
    );
  let book = getBook(title);
  // myLibrary.filter((book) => book.title !== title);
  let index = myLibrary.indexOf(book);
  myLibrary.splice(index, 1);
  updateBookGrid();
};

const toggleRead = (e) => {
  let title =
    e.target.parentElement.parentElement.firstChild.innerHTML.replaceAll(
      '"',
      ''
    );
  let book = getBook(title);
  book.hasRead = !book.hasRead;
  updateBookGrid();
};

// test function for mock data
function initLibrary() {
  const book1 = new Book('Paper Towns', 'John Green', 384, true);
  const book2 = new Book('The Silent Patient', 'Alex Michaelides', 239, false);
  const book3 = new Book('The Book Thief', 'Markus Zusak', 455, false);

  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);

  updateBookGrid();
  console.log(myLibrary);
}

initLibrary();
