class Bookstore {
  static async getBooks() {
    let response = await fetch('http://localhost:3000/api/books');
    let data = await response.json();
    return data;
  }
}

module.exports = Bookstore;
