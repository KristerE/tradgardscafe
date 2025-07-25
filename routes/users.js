const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = []; // { username, passwordHash }

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.send("Fyll i allt");

  const existing = users.find(u => u.username === username);
  if (existing) return res.send("Användarnamnet är redan taget");

  const hash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash: hash });

  res.redirect('/users/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.send("Fel användare/lösenord");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.send("Fel användare/lösenord");

  req.session.user = { username };
  res.redirect('/reviews');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = { router, users };
