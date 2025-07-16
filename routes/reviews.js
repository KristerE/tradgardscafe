const express = require('express');
const router = express.Router();

// Visa redigeringsformulär
router.get('/edit/:index', (req, res) => {
	const { index } = req.params
	const review = reviews[index]

	if (!req.session.user) return res.send('Du måste vara inloggad.')
	if (!review || review.name !== req.session.user.username) {
		return res.send('Du har inte behörighet att redigera detta.')
	}

	res.render('edit-review', { review, index })
})

// Hantera uppdatering
router.post('/edit/:index', (req, res) => {
	const { index } = req.params
	const { message } = req.body
	const review = reviews[index]

	if (!req.session.user || !review || review.name !== req.session.user.username) {
		return res.send('Otillåten åtgärd.')
	}

	review.message = message
	review.approved = false // Måste godkännas igen
	review.date = new Date().toLocaleDateString()

	res.redirect('/reviews')
})

module.exports = router
