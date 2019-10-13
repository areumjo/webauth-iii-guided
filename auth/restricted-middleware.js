const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // we don't wanna check username/password ==> need to refactor

  const token = req.headers.authorization;

  // see if there is a token
  // check if it's valid =>
  //    rehash the header + payload + secret and see if matches our verify signature
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log('failed verify ,', err);
        res.status(401).json({
          message: 'not veified'
        })
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({
      message: 'no token provided'
    })
  }


  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
  
};
