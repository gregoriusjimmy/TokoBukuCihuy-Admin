// Bookstore class to handle CRUD of the book
class Bookstore {
  static async getBooks() {
    let response = await fetch('http://localhost:3000/api/books');
    let data = await response.json();
    return data;
  }

  static async addBook(dataSend) {
    let response = await fetch('http://localhost:3000/api/books', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataSend),
    });
    if (response.status === 200) {
      return 'Good';
    } else {
      return 'Not Good';
    }
  }
}

module.exports = Bookstore;
