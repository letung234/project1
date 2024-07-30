const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const router = express.Router();
const controller = require('../../controllers/admin/product');
const upload = multer({ storage: storageMulter});
const validatesProduct = require('../../validates/admin/product');
router.get('/', controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteProduct)
router.get('/create',controller.create);
router.post('/create',upload.single("thumbnail"),validatesProduct.createPost, controller.store);
router.get('/edit/:id', controller.editProduct)
router.patch('/edit/:id',upload.single("thumbnail"),validatesProduct.createPost, controller.updateProduct)
router.get('/detail/:id', controller.detail)
module.exports = router;
