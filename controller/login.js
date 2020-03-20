const handleLoginPost = (req, res, pool) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    pool.query(
      'SELECT * FROM admin WHERE username = $1 AND password = $2',
      [username, password],
      (error, results) => {
        if (results.rows.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/admin');
        } else {
          res.send('Incorrect Username and/or Password!');
        }
        res.end();
      }
    );
  } else {
    res.send('Please enter Username and Password!');
  }
};

module.exports = {
  handleLoginPost,
};
