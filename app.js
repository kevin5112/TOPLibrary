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

function addBookToLibrary() {
  let book1 = new Book('the book', 'charles', 234, false);
  let book2 = new Book('the wood', 'jimmy', 42, true);
  //   console.log(book1.info());
  //   console.log(book2.info());
  myLibrary.push(book1);
  myLibrary.push(book2);
  //   console.log(myLibrary);
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

addBookToLibrary();
displayBook();
