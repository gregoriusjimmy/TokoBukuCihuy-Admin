const Bookstore = require('./Bookstore');
let bookList = document.getElementById('book-list');

{
  /* <div class="card">
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
</div> */
}

Bookstore.getBooks().then(data => {
  let bookList = document.getElementById('book-list');
  data.forEach(book => {
    let bookCard = document.createElement('div'),
      bookCover = document.createElement('img'),
      cardBody = document.createElement('div'),
      cardTitle = document.createElement('h5'),
      modal = document.createElement('div'),
      btnView = document.createElement('button');

    btnView.type = 'button';
    btnView.classList.add('btn', 'btn-primary');
    btnView.setAttribute('data-toggle', 'modal');
    btnView.setAttribute('data-target', `#modal-${book.id}`);

    modal.classList.add('modal', 'fade');
    modal.id = `modal-${book.id}`;
    modal.tabIndex = '-1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>`;

    bookCard.id = book.id;
    bookCard.style.width = '152px';
    bookCard.classList.add('card');
    bookCover.classList.add('card-img-top', 'book-cover');
    bookCover.src = book.imageLinks;
    cardBody.classList.add('card-body');
    cardTitle.classList.add('book-title');
    cardTitle.textContent = book.title;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(btnView);
    cardBody.appendChild(modal);
    bookCard.appendChild(bookCover);
    bookCard.appendChild(cardBody);
    bookList.appendChild(bookCard);
    // document.body.appendChild(modal);
  });
});

let title = document.getElementById('title'),
  authors = document.getElementById('authors'),
  publisher = document.getElementById('publisher'),
  publishedDate = document.getElementById('publishedDate'),
  description = document.getElementById('description'),
  pageCount = document.getElementById('pageCount'),
  categories = document.getElementById('categories'),
  imageLinks = document.getElementById('imageLinks'),
  price = document.getElementById('price');

let inputElements = document.querySelectorAll('input.form-control');

inputElements.forEach(input => {
  let invalidFeedback = document.createElement('div');
  invalidFeedback.classList.add('invalid-feedback');
  invalidFeedback.textContent = 'field tidak boleh kosong';
  input.parentElement.appendChild(invalidFeedback);
});

let form = document.getElementsByClassName('needs-validation')[0];
form.addEventListener('submit', event => {
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
});
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
