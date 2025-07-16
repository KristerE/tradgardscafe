const express = require('express')
const router = express.Router()
const { reviews } = require('./reviews') // Dela samma array

const ADMIN_PASSWORD = 'admin123'

// Mellanhand för autentisering
function checkAuth(req, res, next) {
	if (req.session && req.session.authenticated) {
		return next()
	} else {
		res.redirect('/admin/login')
	}
}

// Inloggningsformulär
router.get('/login', (req, res) => {
	res.render('admin-login')
})

router.post('/login', (req, res) => {
	const { password } = req.body
	if (password === ADMIN_PASSWORD) {
		req.session.authenticated = true
		res.redirect('/admin/reviews')
	} else {
		res.send('Fel lösenord!')
	}
})

// Visa alla recensioner
router.get('/reviews', checkAuth, (req, res) => {
	res.render('admin', { reviews })
})

// Godkänn
router.post('/approve/:index', checkAuth, (req, res) => {
	const i = req.params.index
	if (reviews[i]) reviews[i].approved = true
	res.redirect('/admin/reviews')
})

// Ta bort
router.post('/delete/:index', checkAuth, (req, res) => {
	const i = req.params.index
	reviews.splice(i, 1)
	res.redirect('/admin/reviews')
})

module.exports = router
