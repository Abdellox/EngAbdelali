const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  images: [String],
  category: String,
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  specifications: mongoose.Schema.Types.Mixed,
  moq: Number,
  sourceUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
