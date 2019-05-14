var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// Create a model with user authentication data.
var users = [
  {
    username: 'admin',
    password: 'admin'
  }
];

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(users);
});

// Compare the data in the 'users' model with those that came from the login form. If there is a match, create a jwt-token and send it back to the request body.
router.post('/', async function (req, res, next) {
  const body = req.body;

  const usernameIndex = users.find(item => item.username === body.username),
      passwordIndex = users.find(item => item.password === body.password);

  try {
    if(usernameIndex != null && passwordIndex != null) {
      var jwt = require('jsonwebtoken');
      var token = jwt.sign(usernameIndex, 'shhhhh');

      res.status(200).json({
        idToken: token,
        expiresIn: 120
      });
    } else {
      res.status(200).json({
        login: false
      });
    }
  }
  catch(err) {
    // unexpected error
    return res.status(400).json({ error: err.message });
  }


});

module.exports = router;
