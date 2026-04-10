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
}

const lotro = new Book("Lord Of The Rings", "JRR Tolkien", "400", "Read");

console.log(lotro);
