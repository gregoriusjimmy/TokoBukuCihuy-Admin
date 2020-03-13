const handleBooksGet = (req, res, pool) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      res.status(400).json('unable to fetch');
    } else {
      console.log(results.rows);
      res.status(200).json(results.rows);
    }
  });
};
const handleBooksPost = (req, res, pool) => {};
const handleBooksPut = (req, res, pool) => {};
const handleBooksDelete = (req, res, pool) => {};

module.exports = {
  handleBooksGet,
  handleBooksPost,
  handleBooksPut,
  handleBooksDelete,
};
