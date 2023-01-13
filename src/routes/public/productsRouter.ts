import express from 'express';
import productsControllrer from '../../controllers/productsController';

const productsRouter = express.Router();

productsRouter
  .route('/:id')
  .get(productsControllrer.getFullProductById)
  .post(productsControllrer.createNewProduct)
  .patch(productsControllrer.updateProductInfo)
  .delete(productsControllrer.deleteProduct);

// TODO: pagination
productsRouter.route('/').get(productsControllrer.getProducts);

export default productsRouter;
