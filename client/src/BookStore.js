class BookStore {
  static getBooks() {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=""';
    const data = fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
    return Promise.resolve(data);
  }
  static searchBooks(searchInput) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchInput;
    const data = fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
    return Promise.resolve(data);
  }
}

module.exports = BookStore;
