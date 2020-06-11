let myLibrary = [];
const libraryDiv = document.querySelector(".library");
const bookButton = document.querySelector(".newBookButton");
const bookForm = document.querySelector(".bookForm");
const bgModal = document.querySelector(".bg-modal");
const closeForm = document.querySelector(".closeForm");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const genre = document.querySelector("#genre");
const numPages = document.querySelector("#numPages");
const read = document.querySelector("#read");

if (localStorage.length) {
    myLibrary = retrieve();
    render(myLibrary);
}

function retrieve() {
    return JSON.parse(localStorage.getItem('array'));
}

function populateStorage() {
    localStorage.setItem('array', JSON.stringify(myLibrary));
}

bookButton.addEventListener("click", () => {
    bgModal.style.display = "flex";
})

function bookObject(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

closeForm.addEventListener("click", () => {
    bgModal.style.display = "none";
    bookForm.reset();

});

submitButton.addEventListener("click", (e) => {
    let validated = validateForm();
    if (validated) {
        e.preventDefault();
        bgModal.style.display = "none";
        addBookToLibrary(e);
    }
});



function addBookToLibrary(e) {
    let newBook = new bookObject(title.value, author.value, genre.value, numPages.value, read.value);
    myLibrary.push(newBook);
    render(myLibrary);
    bookForm.reset();
}

function render(myLibrary) {
    libraryDiv.textContent = "";
    let index = 0;
    for (item of myLibrary) {
        const newBook = document.createElement("div");
        const newTitle = document.createElement("p")
        const newAuthor = document.createElement("p");
        const newGenre = document.createElement("p");
        const newPages = document.createElement("p");
        const newRead = document.createElement("p");

        newTitle.classList = "newTitle";

        newTitle.textContent = item.title;
        newAuthor.textContent = "Author: " + item.author;
        newGenre.textContent = "Genre: " + item.genre;
        newPages.textContent = "Pages: " + item.pages;
        newRead.textContent = "Finished? " + item.read;

        newBook.appendChild(newTitle);
        newBook.appendChild(newAuthor);
        newBook.appendChild(newGenre);
        newBook.appendChild(newPages);
        newBook.appendChild(newRead);

        if (item.read == "") {
            var x = document.createElement("IMG");
            x.setAttribute("src", "images/checkmark2.png");
            x.setAttribute("alt", "checkmark");
            x.classList = "checkmark";

            newRead.appendChild(x)
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList = "deleteButton"
        deleteButton.dataset.bookIndex = index;
        deleteButton.addEventListener("click", deleteBook);


        const readStatus = document.createElement("button");
        readStatus.textContent = "Read Status";
        readStatus.classList = "readStatusButton";
        readStatus.dataset.bookIndex = index;
        readStatus.addEventListener("click", toggleRead);

        const buttonDiv = document.createElement("div");
        buttonDiv.appendChild(readStatus);
        buttonDiv.appendChild(deleteButton);
        buttonDiv.classList = "buttonDiv";

        const bookWrapper = document.createElement("div");
        bookWrapper.classList = "book";
        bookWrapper.appendChild(newBook);
        bookWrapper.appendChild(buttonDiv)
        libraryDiv.appendChild(bookWrapper);
        index += 1;

    }
    populateStorage();
}

function validateForm() {
    if (!title.checkValidity() || (!numPages.checkValidity())) {
        return false;
    } else {
        return true;
    }
}


function deleteBook(e) {
    let bookIndex = e.target.dataset.bookIndex;
    myLibrary.splice(bookIndex, 1);
    render(myLibrary);
}

function toggleRead(e) {
    let bookIndex = e.target.dataset.bookIndex;

    if (myLibrary[bookIndex].read == "") {
        myLibrary[bookIndex].read = "Not yet"
    } else {
        myLibrary[bookIndex].read = "";
    }
    render(myLibrary)
}