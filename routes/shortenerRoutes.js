const express = require('express');
const router = express.Router();
const shortenerController = require('../controllers/shortenerController');
const redirectController = require('../controllers/redirectController');
const analyticsService = require('../services/analyticsService');

// POST /shorturls - create
router.post('/shorturls', shortenerController.createShortURL);

// GET /shorturls/:shortcode - analytics
router.get('/shorturls/:shortcode', analyticsService.getStats);

// GET /:shortcode - redirect
router.get('/:shortcode', redirectController.redirect);

module.exports = router;