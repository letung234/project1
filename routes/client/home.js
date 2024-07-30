const express = require('express');
const router = express.Router();
const controller = require('../../controllers/clients/home')
router.get('/', controller.index);
module.exports = router;