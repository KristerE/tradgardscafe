const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Visa alla recensioner
router.get('/', reviewController.getReviews);

// Skapa ny recension
router.post('/', reviewController.postReview);

// Redigera recension
router.post('/edit/:id', reviewController.editReview);

// Ta bort recension
router.post('/delete/:id', reviewController.deleteReview);

module.exports = router;
