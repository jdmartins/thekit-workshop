// Check if user is authenticated
module.exports = {
  isAuthenticated: function(req, res, next) {
    // if there is an object user on the session
    // calls the next function
    if (req.session.user) return next();
    res.redirect('/login');
  },
  preventLoginPageAccess: function(req, res, next) {
    if (!req.session.user) return next();
    res.redirect('/admin');
  },
};
