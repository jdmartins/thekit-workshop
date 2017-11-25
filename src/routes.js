var express = require('express');
var router = express.Router();
const middleware = require('./middleware');
const catalog = require('./controllers/catalog');
const login = require('./controllers/login');
const register = require('./controllers/register');
const logout = require('./controllers/logout');

/**
 * Routes
 */

router.get('/', function(req, res) {
  res.redirect('/catalog');
});
router.get('/catalog', catalog.getCatalog);
router.get('/admin/add', middleware.isAuthenticated, catalog.loadAdd);
router.post('/admin/add', middleware.isAuthenticated, catalog.addBook);
router.get('/admin', middleware.isAuthenticated, catalog.getAdmin);

router.delete('/admin/:id', middleware.isAuthenticated, catalog.delete);
router.get('/addBooks', middleware.isAuthenticated, catalog.addBooks);
// router.put('/admin/:id', catalog.update);
// router.get('/catalog/:id', catalog.readSingle);

router.get('/register', register.read);
router.post('/register', register.create);

router.get('/login', middleware.preventLoginPageAccess, login.read);
router.post('/login', login.create);

router.get('/logout', logout.read);

module.exports = router;
