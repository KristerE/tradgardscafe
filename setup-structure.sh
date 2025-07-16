#!/bin/bash

echo "📁 Skapar mappstruktur..."

mkdir -p \
  public/uploads \
  views/partials \
  models \
  routes \
  scripts \
  config

touch \
  views/index.ejs \
  views/gallery.ejs \
  views/gallery-admin.ejs \
  views/login.ejs \
  views/register.ejs \
  views/reviews.ejs \
  views/edit-review.ejs \
  views/admin.ejs \
  views/partials/header.ejs \
  views/partials/footer.ejs \
  models/User.js \
  models/Image.js \
  routes/gallery.js \
  routes/reviews.js \
  routes/users.js \
  routes/admin.js \
  config/cloudinary.js \
  scripts/seed-admin.js \
  .env

echo "✅ Struktur klar!"
