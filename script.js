const Bookstore = require('./Bookstore');

// Fetch all books for first time
Bookstore.getBooks().then(data => {
  let bookList = document.getElementById('book-list');
  data.forEach(book => {
    // create nessecary element
    let bookCard = document.createElement('div'),
      bookCover = document.createElement('img'),
      cardBody = document.createElement('div'),
      cardTitle = document.createElement('h5'),
      modal = document.createElement('div'),
      btnView = document.createElement('button');

    // set button view when click on it,, modal show up
    btnView.type = 'button';
    btnView.classList.add('btn', 'btn-primary');
    btnView.setAttribute('data-toggle', 'modal');
    btnView.setAttribute('data-target', `#modal-${book.id}`);

    // modal per book, contain full information of the book
    modal.classList.add('modal', 'fade');
    modal.id = `modal-${book.id}`;
    modal.tabIndex = '-1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="d-flex">
          <div class="mr-2">
            <img src=${book.imageLinks} />
          </div>
          <div class="pt-2 book-field">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>: ${book.title}</td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>: ${book.authors}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>: ${book.publisher}</td>
                </tr>
                <tr>
                  <td>Published</td>
                  <td>: ${book.publishedDate}</td>
                </tr>
                <tr>
                  <td>Pages</td>
                  <td>: ${book.pageCount}</td>
                </tr>
                <tr>
                  <td>Categories</td>
                  <td>: ${book.categories}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pt-2">
          <p>${book.description}</p>
        </div>
        <div>
          <p>${book.price}</p>
        </div>
      </div>
      <div class="modal-footer">
      <button id="delBtn" bookId="${book.id}"type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>`;

    // add content and classes to card element
    bookCard.id = book.id;
    bookCard.style.width = '152px';
    bookCard.classList.add('card');
    bookCover.classList.add('card-img-top', 'book-cover');
    bookCover.src = book.imageLinks;
    cardBody.classList.add('card-body');
    cardTitle.classList.add('book-title');
    cardTitle.textContent = book.title;

    // wrapping up the card together
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(btnView);
    cardBody.appendChild(modal);
    bookCard.appendChild(bookCover);
    bookCard.appendChild(cardBody);
    bookList.appendChild(bookCard);
  });
});

// get all input form
let title = document.getElementById('title'),
  authors = document.getElementById('authors'),
  publisher = document.getElementById('publisher'),
  publishedDate = document.getElementById('publishedDate'),
  description = document.getElementById('description'),
  pageCount = document.getElementById('pageCount'),
  categories = document.getElementById('categories'),
  imageLinks = document.getElementById('imageLinks'),
  price = document.getElementById('price');

// get all input element and add invalid feedback div below them
let inputElements = document.querySelectorAll('input.form-control');
inputElements.forEach(input => {
  let invalidFeedback = document.createElement('div');
  invalidFeedback.classList.add('invalid-feedback');
  // here the feedback content
  invalidFeedback.textContent = 'field tidak boleh kosong';
  input.parentElement.appendChild(invalidFeedback);
});

// check if the input valid or not
// the boostrap handle it
let form = document.getElementsByClassName('needs-validation')[0];
form.addEventListener('submit', event => {
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
});

//submiting form
let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', event => {
  const form = {
    title: title.value,
    authors: authors.value,
    publisher: publisher.value,
    publishedDate: publishedDate.value,
    description: description.value,
    pageCount: pageCount.value,
    categories: categories.value,
    imageLinks: imageLinks.value,
    price: price.value,
  };
  Bookstore.addBook(form);
});
