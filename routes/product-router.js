const productController = require('../controllers/product-controller');

const productRouter = require('express').Router();

productRouter.route('/product')
    .get(productController.getAll)
    .post(productController.insert);

productRouter.route('/product/:id')
    .get(productController.getOne)
    .put(productController.update)
    .delete(productController.delete);

module.exports = productRouter;