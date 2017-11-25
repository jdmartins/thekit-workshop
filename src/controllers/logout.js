const fire = require('../firebase');
const auth = fire.auth();

module.exports = {
  read: function(req, res) {
    auth.signOut().then(function() {
      req.session.user = undefined;
      res.redirect('/');
    });
  },
};
