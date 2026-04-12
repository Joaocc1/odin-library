const bookStand = document.querySelector(".bookstand");
const openModal = document.querySelector(".open-modal");
const addBookModal = document.querySelector("#add-book-modal");
const addBookBtn = document.querySelector("#add-book-btn");

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

function createBookDisplay(book) {
  const row = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  const status = document.createElement("td");
  const remove = document.createElement("td");
  const delBtn = document.createElement("button");

  row.setAttribute("data-id", book.id);

  delBtn.classList.add("remove");
  delBtn.setAttribute("data-id", book.id);

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
}

function showLibrary() {
  myLibrary.forEach((book) => {
    createBookDisplay(book);
  });
}

openModal.addEventListener("click", () => {
  addBookModal.showModal();
});

addBookBtn.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;

  addBookToLibrary(title, author, pages, read);

  const book = myLibrary[myLibrary.length - 1];
  createBookDisplay(book);
});

console.log(myLibrary);

showLibrary();

bookStand.addEventListener("click", (e) => {
  if (e.target.matches(".remove")) {
    const bookId = e.target.dataset.id;
    const bookRow = document.querySelector(`[data-id="${bookId}"]`);
    const getBook = myLibrary.indexOf(
      myLibrary.find((book) => book.id === bookId),
    );
    myLibrary.splice(getBook, 1);
    bookRow.remove();
    console.log(myLibrary);
  }
});
