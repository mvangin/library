let myLibrary = [];
const libraryDiv = document.querySelector(".library");
const bookButton = document.querySelector(".newBookButton");
const bookForm = document.querySelector(".bookForm");
const bgModal = document.querySelector(".bg-modal");
const closeForm = document.querySelector(".closeForm");



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

function bookObject(author, title, genre, pages, read) {
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

closeForm.addEventListener("click", () => {
    bgModal.style.display = "none";
});

submitButton.addEventListener("click", (e) => {
    bgModal.style.display = "none";
    addBookToLibrary(e);
});



function addBookToLibrary(e) {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const numPages = document.querySelector("#numPages").value;
    const read = document.querySelector("#read").value;

    let newBook = new bookObject(title, author, genre, numPages, read);
    myLibrary.push(newBook);
    render(myLibrary);
    bookForm.reset();
}

function render(myLibrary) {
    libraryDiv.textContent = "";
    let index = 0;
    for (item of myLibrary) {
        const newDiv = document.createElement("div");
        newDiv.classList = "book";
        const textNode = document.createTextNode(
            "Title: " + item.author + "\n" +
            "Author: " + item.title + "\n" +
            "Genre: " + item.genre + "\n" +
            "Pages: " + item.pages + "\n" +
            "Finished? " + item.read + "\n");

        preObject = document.createElement('Pre');
        preObject.appendChild(textNode);
        newDiv.appendChild(preObject);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.classList = "deleteButton"
        deleteButton.dataset.bookIndex = index;
        deleteButton.addEventListener("click", deleteBook);


        const readStatus = document.createElement("button");
        readStatus.textContent = "Read Status";
        readStatus.classList = "readStatusButton";
        readStatus.dataset.bookIndex = index;
        readStatus.addEventListener("click", toggleRead);

        newDiv.appendChild(readStatus);
        newDiv.appendChild(deleteButton);
        libraryDiv.appendChild(newDiv);
        index += 1;

    }
    populateStorage();
}



function deleteBook(e) {
    let bookIndex = e.target.dataset.bookIndex;
    myLibrary.splice(bookIndex, 1);
    render(myLibrary);
}

function toggleRead(e) {
    let bookIndex = e.target.dataset.bookIndex;

    if (myLibrary[bookIndex].read == "Finished!") {
        myLibrary[bookIndex].read = "Not yet"
    } else {
        myLibrary[bookIndex].read = "Finished!";
    }
    render(myLibrary)
}

















/*
const createBookButton = document.createElement("button");
createBookButton.setAttribute("class", "newBookButton");
createBookButton.textContent = "NEW BOOK";
libraryDiv.appendChild(createBookButton);


const newBookButton = document.querySelector(".newBookButton");

createBookButton.addEventListener("click", () => {
    createNewForm();
})
function createNewForm() {
    const form = document.createElement("form");
    form.setAttribute("class", "bookForm");
    const ul = document.createElement("ul");
    form.appendChild(ul);
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type","submit");
    submitButton.textContent = "Submit";
    form.append(submitButton);
    libraryDiv.appendChild(form);


    const li = document.createElement("li");
    const input = document.createElement("input");
    input.setAttribute("class", "formInput");
    input.placeholder = "genre?";
    const liINput = li.appendChild(input);
    ul.appendChild(li);

    const clonedLI = liINput.cloneNode(true);
    ul.appendChild(clonedLI);

    const clonedLI2 = liINput.cloneNode(true);
    ul.appendChild(clonedLI2);
/*
    const formNode = document.querySelector(".bookForm");
    const inputNode = document.querySelector(".formInput");

    input2 = inputNode.cloneNode(true);
    input2.setAttribute("placeholder","author?")
    formNode.appendChild(input2)

    input3 = inputNode.cloneNode(true);
    input3.setAttribute("placeholder","title?")
    formNode.appendChild(input3)

    input4 = inputNode.cloneNode(true);
    input4.setAttribute("placeholder","pages?")
    formNode.appendChild(input4)

    input5 = inputNode.cloneNode(true);
    input5.setAttribute("placeholder","finished?")
    formNode.appendChild(input5)
*/

