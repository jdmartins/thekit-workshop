var express = require('express');
var router = express.Router();
const middleware = require('./middleware');
const catalog = require('./controllers/catalog');
const login = require('./controllers/login');
const register = require('./controllers/register');
const logout = require('./controllers/logout');

/**
 * Routes
 * This is where the
 * magic routing happens
 *
 */

router.get('/', function(req, res) {
  res.send('Olleh Dlrow');
});

module.exports = router;
