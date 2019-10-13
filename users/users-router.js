const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  // if the user is an admin, they can see all users
  // if the user isn't an admin, they can only see themselves (single user not a list of all users)
  // console.log('decoded: ', req.decodedToken);
  const { id, role } = req.decodedToken;

  if (role === 'admin') {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500).send(err));
  } else {
    Users.findById(id)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(500).send(err));
  }
});

module.exports = router;
