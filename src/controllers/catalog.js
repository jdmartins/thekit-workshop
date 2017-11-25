const fire = require('../firebase');
const cache = require('../cache');
const catalogRef = fire.database().ref('catalog');
const _ = require('lodash');
var fs = require('fs');

//We need to invalidate the cache otherwise in we delete nothing changes
catalogRef.on('value', () => cache.del('catalog'));

function getBooksInterval(books, { page = 0 }) {
  const length = 6;
  const orderBy = 'title';
  const arrayIndex = page * length;

  const sortedBooks = orderByChild(books, orderBy);
  return sortedBooks.slice(arrayIndex, Number(arrayIndex) + Number(length));
}

function orderByChild(obj, keyName) {
  return _.sortBy(obj, o => o[keyName].toLowerCase(), ['asc']);
}

function getNumberOfPages(books, length = 6) {
  return Math.ceil(_.size(books) / length);
}

module.exports = {
  getCatalog: function(req, res) {
    const data = { title: 'Catalog', user: req.session.user };
    // put cache after
    const books = cache.get('catalog');
    if (!books) {
      catalogRef
        .once('value')
        .then(snap => {
          cache.set('catalog', snap.val(), (err, success) => {
            if (err) {
              console.log(err);
            }
            const dataToView = Object.assign({}, data, {
              books: getBooksInterval(snap.val(), req.query),
              numberOfPages: getNumberOfPages(snap.val() || 0),
              page: req.query.page || 0,
            });
            res.render('pages/catalog', dataToView);
          });
        })
        .catch(err => console.log(err));
    } else {
      const dataToView = Object.assign({}, data, {
        books: getBooksInterval(books, req.query),
        numberOfPages: getNumberOfPages(books || 0),
        page: req.query.page || 0,
      });
      res.render('pages/catalog', dataToView);
    }
  },

  getAdmin: function(req, res) {
    const data = { title: 'Catalog', user: req.session.user };
    // put cache after
    const books = cache.get('catalog');
    if (!books) {
      catalogRef
        .once('value')
        .then(snap => {
          const sortedBooks = _.sortBy(
            snap.val(),
            o => o['title'].toLowerCase(),
            ['asc']
          );
          cache.set('catalog', sortedBooks, (err, success) => {
            if (err) {
              console.log(err);
            }
            const dataToView = Object.assign({}, data, {
              books: sortedBooks,
            });
            res.render('pages/admin', dataToView);
          });
        })
        .catch(err => console.log(err));
    } else {
      const dataToView = Object.assign({}, data, {
        books,
      });
      res.render('pages/admin', dataToView);
    }
  },
  addBooks: function(req, res) {
    if (!req.body) return res.status(400);
    fs.readFile(`${__dirname}/../../books.json`, 'utf8', function(err, data) {
      if (err) throw err;
      books = JSON.parse(data);
      books.forEach(function(book) {
        const newBookRef = catalogRef.push();
        const newBook = Object.assign({}, book, { id: newBookRef.key });
        newBookRef
          .set(newBook)
          .then(() => res.status(201).json(newBook))
          .catch(err => console.log(err));
      });
    });
  },
  addBook: function(req, res) {
    if (!req.body) return res.status(400);

    const newBookRef = catalogRef.push();
    const newBook = Object.assign({}, req.body, { id: newBookRef.key });
    newBookRef
      .set(newBook)
      .then(() => res.status(201).json(newBook))
      .catch(err => console.log(err));
  },

  loadAdd: function(req, res) {
    res.render('pages/bookForm');
  },

  // Update a book from Id
  update: function(req, res) {
    const bookId = req.params.id;

    // Check if book id exists
    catalog.once('value').then(snap => {
      //if book exists
      if (snap.hasChild(bookId)) {
        const updatedBook = Object.assign({}, req.body, { id: req.params.id });
        booksRef.child(bookId).update(req.body);
      } else {
        // Return source Not Found
        res.status(404).json(notFound);
      }
    });
  },

  // Delete a book from Id
  delete: function(req, res) {
    const bookId = req.params.id;
    console.log(req.params.id);
    // Check if book id exists
    catalogRef.once('value').then(snap => {
      //if book exists
      if (snap.hasChild(bookId)) {
        // Delete Book
        catalogRef.child(bookId).set({}, err => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json({ id: bookId });
          }
        });
      } else {
        // Return source Not Found
        res.status(404).json(notFound);
      }
    });
  },
};
