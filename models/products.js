const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    categories: { type: String, required: true},
    price: { type: Number, required: true },
    // diets: { type: Array },
});

module.exports = mongoose.model('Products', productsSchema)