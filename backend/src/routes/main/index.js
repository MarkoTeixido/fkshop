const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

// Public Main Routes
router.get('/', mainController.defaultView);
router.get('/home', mainController.homeView);
router.get('/contact', mainController.contactView);
router.get('/about', mainController.aboutView);
router.get('/faqs', mainController.faqsView);

module.exports = router;
