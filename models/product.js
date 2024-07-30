const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug); // Kích hoạt plugin slug cho mongoose

const productSchema = new mongoose.Schema({
    name: String,
    title: String,
    price: Number,
    description: String,
    discountPercentage: Number,
    thumbnail: String,
    stock: Number,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
