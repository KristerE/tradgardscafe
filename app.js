const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const path = require('path');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');


// Ladda miljövariabler
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());
app.use('/auth', authRoutes);

// Static och EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB-anslutning
mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/tradgardscafe')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'hemligkod',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/tradgardscafe',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 timmar
  })
);

// Global variabel till vyer
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routers
const galleryRoutes = require('./routes/galleryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', userRoutes);        // login, register, logout
app.use('/gallery', galleryRoutes); // bilder (admin och visning)
app.use('/reviews', reviewRoutes);  // recensioner (visa och admin)

app.get('/', (req, res) => {
  res.render('index', { title: 'Trädgårdscafé' });
});

// Fallback för 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Sidan finns inte' });
});

// Starta server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servern körs på http://localhost:${port}`);
});
