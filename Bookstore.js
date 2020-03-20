// Bookstore class to handle CRUD of the book
class Bookstore {
  static async getBooks() {
    let response = await fetch(
      'https://tokobuku-cihuy.herokuapp.com/api/books'
    );
    let data = await response.json();
    return data;
  }

  static async getBookById(bookId) {
    let response = await fetch(
      'https://tokobuku-cihuy.herokuapp.com/api/books/' + bookId
    );
    let data = await response.json();
    return data;
  }

  static async addBook(dataReceived) {
    let response = await fetch(
      'https://tokobuku-cihuy.herokuapp.com/api/books',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataReceived),
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  static async updateBook(dataReceived) {
    let response = await fetch(
      'https://tokobuku-cihuy.herokuapp.com/api/books',
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataReceived),
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  static async delBook(dataReceived) {
    let response = await fetch(
      'https://tokobuku-cihuy.herokuapp.com/api/books',
      {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataReceived),
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Bookstore;
