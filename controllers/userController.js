const bcrypt = require('bcrypt');
const User = require('../models/User');


// GET /register
exports.getRegister = (req, res) => {
  res.render('auth/register');
};

// POST /register
exports.postRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('auth/register', { error: 'Användarnamnet är redan taget' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      isAdmin: false, // du kan sätta true manuellt i databasen för en admin
    });

    await user.save();

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect('/');
  } catch (err) {
    res.render('auth/register', { error: 'Fel vid registrering' });
  }
};

// GET /login
exports.getLogin = (req, res) => {
  res.render('auth/login');
};

// POST /login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('auth/login', { error: 'Fel användarnamn eller lösenord' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('auth/login', { error: 'Fel användarnamn eller lösenord' });
    }

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect('/');
  } catch (err) {
    res.render('auth/login', { error: 'Fel vid inloggning' });
  }
};

// GET /logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Middleware: skydda routes
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(403).send('Endast administratörer har tillgång');
};
