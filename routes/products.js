const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.post('/products', productsCtrl.postProduct);
router.delete('/products/:id', productsCtrl.deleteProduct);
router.get('/products', productsCtrl.getProduct);

module.exports = router;