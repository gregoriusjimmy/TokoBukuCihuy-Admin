const Bookstore = require('./Bookstore');
const utils = require('./utils');

// setting up toggle hide/show form
let toggleFormBtn = document.getElementById('toggleFormBtn');
let formSection = document.getElementById('form-section');
toggleFormBtn.addEventListener('click', e => {
  if (formSection.style.display === 'none') {
    formSection.style.display = 'block';
  } else {
    formSection.style.display = 'none';
  }
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

let id = null;

let submitBtn = document.getElementById('submitBtn');

// onChange price
price.addEventListener('keyup', e => {
  price.value = utils.formatMoneyOnChange(e.target.value);
});

// get all input element and add invalid feedback div below them
let inputElements = document.querySelectorAll('input.form-control');
inputElements.forEach(input => {
  let invalidFeedback = document.createElement('div');
  invalidFeedback.classList.add('invalid-feedback');
  // here the feedback content
  invalidFeedback.textContent = 'field tidak boleh kosong';
  input.parentElement.appendChild(invalidFeedback);
});

// let updateSubmitBtn = document.getElementById('updateSubmitBtn')
// updateSubmitBtn.addEventListener()
// check if the input valid or not
// the boostrap handle it
let formElement = document.getElementsByClassName('needs-validation')[0];
formElement.addEventListener('submit', event => {
  if (!formElement.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    formElement.classList.add('was-validated');
  } else {
    // submiting form
    event.preventDefault();
    const dataSend = {
      title: title.value,
      authors: authors.value,
      publisher: publisher.value,
      publishedDate: publishedDate.value,
      description: description.value,
      pageCount: pageCount.value,
      categories: categories.value,
      imageLinks: imageLinks.value,
      price: utils.formatFromMoney(price.value),
    };
    // if has id, then we want to update
    if (id) {
      dataSend.id = id;
      Bookstore.updateBook(dataSend).then(response => {
        console.log(dataSend);
        //response returned true or false
        if (response) {
          alert('Update berhasil');
          formElement.classList.remove('was-validated');
          formElement.reset();
          // set id back to null
          id = null;
          document.location.reload();
        } else {
          alert('update gagal');
        }
      });
    } else {
      // check the button is update butotn or not
      if (submitBtn.classList.contains('btn-info')) {
        submitBtn.classList.remove('btn-info');
        submitBtn.classList.add('btn-success');
        submitBtn.textContent = 'Submit';
      }
      Bookstore.addBook(dataSend).then(response => {
        //response returned true or false
        if (response) {
          alert('Submit berhasil');
          formElement.classList.remove('was-validated');
          formElement.reset();
          document.location.reload();
        } else {
          alert('Submit gagal');
        }
      });
    }
  }
});

// Fetch all books for first time
Bookstore.getBooks().then(data => {
  let bookList = document.getElementById('book-list');
  data.forEach(book => {
    // create nessecary element
    let bookCard = document.createElement('div'),
      bookCover = document.createElement('img'),
      cardBody = document.createElement('div'),
      bookTitle = document.createElement('h5'),
      bookAuthor = document.createElement('p'),
      bookPrice = document.createElement('span'),
      modal = document.createElement('div');

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
          <div class="mr-4 my-auto" style="max-width: 152px">
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
                  <td>: ${utils.convertDate2(book.publishedDate)}</td>
                </tr>
                <tr>
                  <td>Pages</td>
                  <td>: ${book.pageCount}</td>
                </tr>
                <tr>
                  <td>Categories</td>
                  <td>: ${book.categories}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>: Rp${utils.formatMoneyOnChange(book.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pt-2">
          <p>${book.description}</p>
        </div>
    
      </div>
      <div class="modal-footer">
        <button id="delBtn-${book.id}" bookId="${
      book.id
    }" type="button" class="btn btn-danger">Delete</button>
        <button id="updateBtn-${book.id}" bookId="${
      book.id
    }" type="button" class="btn btn-info">Update</button>
      </div>
    </div>
  </div>`;

    // if card clicked then show the modal
    bookCard.addEventListener('click', () => {
      $(`#modal-${book.id}`).modal('show');
    });

    // add content and classes to card element
    bookCard.id = book.id;
    bookCard.style.width = '152px';
    bookCard.classList.add('card');
    bookCover.classList.add('card-img-top', 'book-cover', 'img-thumbnail');
    bookCover.src = book.imageLinks;
    cardBody.classList.add('card-body');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.authors;
    bookPrice.classList.add('book-price');
    bookPrice.textContent = `Rp${utils.formatMoneyOnChange(book.price)}`;

    // wrapping up the card together
    cardBody.appendChild(bookTitle);
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(bookPrice);
    // cardBody.appendChild(btnView);
    cardBody.appendChild(modal);
    bookCard.appendChild(bookCover);
    bookCard.appendChild(cardBody);
    bookList.appendChild(bookCard);

    // get close modal button each card
    let closeModalBtn = document.getElementById(`closeModalBtn-${book.id}`);

    // setting up the update button
    let updateBtn = document.getElementById(`updateBtn-${book.id}`);
    updateBtn.addEventListener('click', () => {
      // hide the modal
      $(`#modal-${book.id}`).modal('hide');
      // change submit button to update button
      submitBtn.classList.remove('btn-success');
      submitBtn.classList.add('btn-info');
      submitBtn.textContent = 'Update';

      //get the book data and autofill to form
      Bookstore.getBookById(book.id).then(data => {
        title.value = data.title;
        authors.value = data.authors;
        publisher.value = data.publisher;
        publishedDate.value = utils.convertDate(data.publishedDate);
        pageCount.value = data.pageCount;
        categories.value = data.categories;
        imageLinks.value = data.imageLinks;
        description.value = data.description;
        price.value = utils.formatMoneyOnChange(data.price);
        // set the id
        id = data.id;
      });
    });

    // setting up the delete button
    let delBtn = document.getElementById(`delBtn-${book.id}`);
    delBtn.addEventListener('click', () => {
      const confirmation = confirm('yakin?');
      if (confirmation) {
        //delBook required id of the book
        Bookstore.delBook({
          id: book.id,
        }).then(response => {
          if (response) {
            $(`#modal-${book.id}`).modal('hide');
            bookList.removeChild(bookCard);
            alert('berhasil menghapus buku');
          } else {
            alert('gagal menghapus buku');
          }
        });
      }
    });
  });
});

// search book title algorithm
let searchInput = document.getElementById('searchBook');
searchInput.addEventListener('keyup', () => {
  let filter = searchInput.value.toUpperCase();
  let ul = document.getElementById('book-list');
  let li = ul.getElementsByClassName('card');

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByClassName('book-title')[0];
    let textValue = a.textContent || a.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
});
