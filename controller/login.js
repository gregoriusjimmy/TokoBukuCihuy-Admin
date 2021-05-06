const handleLoginPost = (req, res, client) => {
  const username = req.body.username
  const password = req.body.password
  console.log(username, password)
  if (username && password) {
    client.query(
      'SELECT * FROM admin WHERE username = $1 AND password = $2',
      [username, password],
      (error, results) => {
        console.log(results)
        if (results.rows.length > 0) {
          req.session.loggedin = true
          req.session.username = username
          console.log('redirect to admin')
          res.redirect('/admin')
        } else {
          res.send('Incorrect Username and/or Password!')
          console.log('failed')
        }
        res.end()
      }
    )
  } else {
    res.send('Please enter Username and Password!')
  }
}

module.exports = {
  handleLoginPost,
}
