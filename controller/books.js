const handleBooksGet = (req, res, client) => {
  client.query('SELECT * FROM books', (error, results) => {
    if (error) {
      res.status(400).json('unable to fetch')
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const handleBookGetById = (req, res, client, bookId) => {
  client.query('SELECT * FROM books WHERE id = $1', [bookId], (error, results) => {
    if (error) {
      res.status(400).json('unable to fetch')
    } else {
      res.status(200).json(results.rows[0])
    }
  })
}
const handleBooksPost = (req, res, client) => {
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
  } = req.body

  client.query(
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
        console.log(error)
        res.status(400).json('unable to add')
      } else {
        res.status(200).json('success')
      }
    }
  )
}
const handleBooksPut = (req, res, client) => {
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
    id,
  } = req.body

  client.query(
    'UPDATE books SET title=$1, authors=$2, publisher = $3, "publishedDate" = $4, description = $5, "pageCount"=$6, categories=$7, "imageLinks"=$8, price=$9 WHERE id=$10',
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
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error)
        res.status(400).json('unable to update')
      } else {
        res.status(200).json('success')
      }
    }
  )
}

const handleBooksDelete = (req, res, client) => {
  const { id } = req.body
  client.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      res.status(400).json('unable to delete')
    } else {
      res.status(200).json('success')
    }
  })
}

module.exports = {
  handleBooksGet,
  handleBookGetById,
  handleBooksPost,
  handleBooksPut,
  handleBooksDelete,
}
