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
      cardTitle = document.createElement('h5');

    bookCard.id = book.id;
    bookCard.style.width = '152px';
    bookCard.classList.add('card');
    bookCover.classList.add('card-img-top', 'book-cover');
    bookCover.src = book.imageLinks;
    cardBody.classList.add('card-body');
    cardTitle.classList.add('book-title');
    cardTitle.textContent = book.title;

    cardBody.appendChild(cardTitle);
    bookCard.appendChild(bookCover);
    bookCard.appendChild(cardBody);

    bookList.appendChild(bookCard);
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

let submitBtn = document.getElementById('submitBtn');

// submitBtn.addEventListener('click', event => {
//   event.preventDefault();
//   const form = {
//     title: title.value,
//     authors: authors.value,
//     publisher: publisher.value,
//     publishedDate: publishedDate.value,
//     description: description.value,
//     pageCount: pageCount.value,
//     categories: categories.value,
//     imageLinks: imageLinks.value,
//     price: price.value,
//   };
//   console.log(form);
//   Bookstore.addBook(form);
// });
