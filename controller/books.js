const handleBooksGet = (req, res, pool) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      res.status(400).json('unable to fetch');
    } else {
      res.status(200).json(results.rows);
    }
  });
};
const handleBooksPost = (req, res, pool) => {
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    imageLinks,
    price,
  } = req.body;

  pool.query(
    'INSERT INTO books VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks,
      price,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json('unable to fetch');
      } else {
        res.status(200).json('success');
      }
    }
  );
};
const handleBooksPut = (req, res, pool) => {};
const handleBooksDelete = (req, res, pool) => {};

module.exports = {
  handleBooksGet,
  handleBooksPost,
  handleBooksPut,
  handleBooksDelete,
};
