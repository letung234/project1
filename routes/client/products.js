const express = require('express');
const router = express.Router();
const controller = require('../../controllers/clients/products');
router.get('/', controller.index);
router.get('/:slug', controller.detail);

module.exports = router;