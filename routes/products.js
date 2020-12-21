const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const productsCtrl = require('../controllers/products');

router.post('/', multer, productsCtrl.postProduct);
router.delete('/:id', productsCtrl.deleteProduct);
router.get('/', productsCtrl.getProduct);

module.exports = router;