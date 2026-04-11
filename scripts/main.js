const bookStand = document.querySelector(".bookstand");

const myLibrary = [];

function Book(title, author, pages, status) {
  // prevent error if not using 'new' operator
  if (!new.target) {
    throw Error("Must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

addBookToLibrary("Lord Of The Rings", "JRR Tolkien", "400", "Read");
addBookToLibrary("Dune", "Frank Herbert", "290", "Read");

myLibrary.forEach((book) => {
  console.log(book);
});

console.log(myLibrary);
