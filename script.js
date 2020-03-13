const Bookstore = require('./Bookstore');
let bookList = document.getElementById('book-list');

Bookstore.getBooks().then(data => {
  bookList.innerHTML = `<li>${data[0].title}</li>`;
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

submitBtn.addEventListener('click',()=>{
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
   }
   
   Bookstore.addBook()
})
