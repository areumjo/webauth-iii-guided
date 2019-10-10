const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = requrie('jsonwebtoken');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // a jwt should be generated
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  // need - header, payload and verify signature && user metadata and secret
  // // payload -> username, id, roles, exp date 
  const payload = {
    sub: user.id,
    username: user.usernmae,
  };
  const options = {
    expiresIn: '1d'
  }
  // // v signature -> a secret


  return jwt.sign(payload, process.env.JWT_SECRET, options);
  // to use env, need to put `process.env.env-var-name`
}

module.exports = router;
