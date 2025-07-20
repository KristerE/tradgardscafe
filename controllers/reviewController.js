const Review = require('../models/Review');

// Visa alla recensioner
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.render('reviews', { reviews, user: req.user });
  } catch (err) {
    res.status(500).send('Fel vid hämtning av recensioner');
  }
};

// Lägga till recension
exports.postReview = async (req, res) => {
  try {
    const newReview = new Review({
      name: req.body.name,
      comment: req.body.comment
    });
    await newReview.save();
    res.redirect('/reviews');
  } catch (err) {
    res.status(500).send('Kunde inte spara recension');
  }
};

// Redigera recension
exports.editReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.name = req.body.name;
      review.comment = req.body.comment;
      await review.save();
    }
    res.redirect('/reviews');
  } catch (err) {
    res.status(500).send('Redigering misslyckades');
  }
};

// Ta bort recension (admin)
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect('/reviews');
  } catch (err) {
    res.status(500).send('Fel vid borttagning');
  }
};
