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
  const row = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  const status = document.createElement("td");
  const remove = document.createElement("td");
  const delBtn = document.createElement("button");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  status.textContent = book.status;
  delBtn.textContent = "Remove";

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(status);
  remove.appendChild(delBtn);
  row.appendChild(remove);

  bookStand.appendChild(row);
});

console.log(myLibrary);
