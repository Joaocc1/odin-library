const bookStand = document.querySelector(".bookstand");
const openModal = document.querySelector(".open-modal");
const addBookModal = document.querySelector("#add-book-modal");
const addBookBtn = document.querySelector("#add-book-btn");

// Array that holds all books
const myLibrary = [];

// Function constructor that creates new book objects
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

Book.prototype.toggleStatus = function () {
  this.status = !this.status;
};

// Functions
function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function createBookDisplay(book) {
  const row = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  const status = document.createElement("td");
  const toggleBtn = document.createElement("button");
  const remove = document.createElement("td");
  const delBtn = document.createElement("button");

  row.setAttribute("data-id", book.id);

  toggleBtn.classList.add("toggle-btn");
  toggleBtn.setAttribute("data-id", book.id);
  delBtn.classList.add("remove");
  delBtn.setAttribute("data-id", book.id);

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  toggleBtn.textContent =
    book.status === true ? "Yes" : book.status === false ? "No" : "N/A";
  delBtn.textContent = "Remove";

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(status);
  status.appendChild(toggleBtn);
  remove.appendChild(delBtn);
  row.appendChild(remove);

  bookStand.appendChild(row);
}

function showLibrary() {
  myLibrary.forEach((book) => {
    createBookDisplay(book);
  });
}

// Event listeners
openModal.addEventListener("click", () => {
  addBookModal.showModal();
});

addBookBtn.addEventListener("click", () => {
  const addBookForm = document.querySelector(".add-book-form");
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read =
    document.querySelector("#read").value === "Yes"
      ? true
      : document.querySelector("#read").value === "No"
        ? false
        : "N/A";

  addBookToLibrary(title, author, pages, read);

  const book = myLibrary[myLibrary.length - 1];
  createBookDisplay(book);

  addBookForm.reset();
});

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

bookStand.addEventListener("click", (e) => {
  if (e.target.matches(".toggle-btn")) {
    const bookId = e.target.dataset.id;
    const toggleBtn = document.querySelector(`.toggle-btn[data-id="${bookId}"`);
    const getBook = myLibrary.indexOf(
      myLibrary.find((book) => book.id === bookId),
    );
    myLibrary[getBook].toggleStatus();
    toggleBtn.textContent =
      toggleBtn.textContent === "Yes"
        ? "No"
        : toggleBtn.textContent === "No"
          ? "Yes"
          : "N/A";
  }
});

addBookModal.addEventListener("click", (e) => {
  if (e.target === addBookModal) {
    addBookModal.close();
  }
});

// add initial books
addBookToLibrary("Lord Of The Rings", "JRR Tolkien", "1216", true);
addBookToLibrary("Dune", "Frank Herbert", "658", true);
addBookToLibrary("A Gentleman in Moscow", "Amor Towles", "495", false);

console.log(myLibrary);
showLibrary();

// To do
//
// - refine front-end ui, especially the add book modal
// - (optional) add a confirmation prompt when removing book
