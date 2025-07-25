// Kolla om användaren är inloggad
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash('error', 'Du måste vara inloggad för att fortsätta');
  res.redirect('/auth/login');
};

// Kolla om användaren är admin
exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(403).send('Endast administratörer har tillgång');
};
