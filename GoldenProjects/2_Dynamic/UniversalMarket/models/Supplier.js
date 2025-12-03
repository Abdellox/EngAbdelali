const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'China'
  },
  website: String,
  apiEndpoint: String,
  apiKey: String,
  rating: Number,
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);
