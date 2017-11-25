const fire = require('../firebase');
const cache = require('../cache');
const catalogRef = fire.database().ref('catalog');
const _ = require('lodash');
var fs = require('fs');

/**
 * Book Catalog should
 *
 * getCatalog: function
 * which queries the firebase database
 * then sorts all the books by title order
 * caches them and returns 6 books per page
 * for the view
 *
 * getAdmin: function
 * Queries the DB for books or gets them from cache
 * and renders a view with the results
 *
 * getAdd: function
 * Queries the DB for books or gets them from cache
 * and renders a view with the results
 *
 *
 * addBook: function
 * Adds a new book to the database
 *
 * deleteBook: function
 * Adds a new book to the database
 *
 * We need to invalidate the cache
 * for changes to take effect (for example when deleting books)
 */
