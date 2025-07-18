const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tradgardscafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB ansluten'))
  .catch((err) => console.error('❌ MongoDB fel:', err));


const indexRouter = require('./routes/index')
const menuRouter = require('./routes/menu')
const contactRouter = require('./routes/contact')
const reviewsRouter = require('./routes/reviews')
const galleryRoutes = require('./routes/gallery');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  message: String,
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Review', reviewSchema);

const adminRouter = require('./routes/admin')
const { router: usersRouter, users } = require('./routes/users');


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(
	session({
		secret: 'superhemligkod123',
		resave: false,
		saveUninitialized: false,
	})
)

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Rutter
app.use('/', indexRouter)
app.use('/menu', menuRouter)
app.use('/contact', contactRouter)
app.use('/reviews', reviewsRouter)
app.use('/admin', adminRouter)
app.use('/users', usersRouter);
app.use('/gallery', galleryRoutes);


app.listen(port, () => {
	console.log(`🌿 Trädgårdscaféet körs på http://localhost:${port}`)
})
