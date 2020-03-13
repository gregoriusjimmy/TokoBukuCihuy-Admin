const Bookstore = require('./BookStore');
let data;
Bookstore.getBooks().then(data => {
  let cardList = document.getElementById('card-list');
  cardList.innerHTML = `<li>${data.items[0].volumeInfo.title}</li>`;
});
console.log(data);
