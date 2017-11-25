const fire = require('../firebase');
const auth = fire.auth();

module.exports = {
  read: function(req, res) {
    const data = { title: 'Register Account', formError: false };
    res.render('pages/register', data);
  },

  create: function(req, res) {
    const promise = auth.createUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    );

    promise
      .then(function() {
        res.json({
          error: false,
          message: 'Account successful created',
        });
      })
      .catch(function(errData) {
        res.json({
          error: true,
          message: errData.message,
        });
      });
  },
};
