const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['sneakers', 'formal', 'sports', 'casual']
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    badge: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
