const fire = require('../firebase');
const auth = fire.auth();

module.exports = {
  read: function(req, res) {
    const data = {
      title: 'Login',
      formError: false,
    };
    res.render('pages/login', data);
  },
  create: function(req, res) {
    // when we receive the form data
    // we want to authtenticate our user
    const promise = auth.signInWithEmailAndPassword(
      req.body.email,
      req.body.password
    );

    promise
      .then(function(userData) {
        req.session.user = userData;
        res.json({
          error: false,
          user: userData,
          message: 'Login Successful',
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
