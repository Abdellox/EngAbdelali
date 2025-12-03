const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Scrape products from supplier (admin only)
router.post('/:id/scrape', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Example scraping logic (customize based on actual supplier website)
    const response = await axios.get(supplier.website, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const products = [];

    // Example selector - customize based on actual website structure
    $('.product-item').each((i, elem) => {
      const title = $(elem).find('.product-title').text().trim();
      const price = parseFloat($(elem).find('.product-price').text().replace(/[^0-9.]/g, ''));
      const image = $(elem).find('img').attr('src');
      
      if (title && price) {
        products.push({
          title,
          price,
          images: [image],
          supplier: supplier._id,
          sourceUrl: supplier.website
        });
      }
    });

    // Save products to database
    await Product.insertMany(products);

    res.json({ message: `Scraped ${products.length} products`, count: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Scraping error', error: err.message });
  }
});

// Fetch from API (if supplier has API)
router.post('/:id/fetch-api', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier || !supplier.apiEndpoint) {
      return res.status(404).json({ message: 'Supplier API not configured' });
    }

    const response = await axios.get(supplier.apiEndpoint, {
      headers: {
        'Authorization': `Bearer ${supplier.apiKey}`
      }
    });

    const products = response.data.products.map(p => ({
      title: p.name || p.title,
      description: p.description,
      price: p.price,
      images: p.images || [p.image],
      category: p.category,
      supplier: supplier._id,
      specifications: p.specs,
      moq: p.moq
    }));

    await Product.insertMany(products);

    res.json({ message: `Fetched ${products.length} products`, count: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'API fetch error', error: err.message });
  }
});

module.exports = router;
