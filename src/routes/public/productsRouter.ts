import express from 'express'
import productsControllrer from '../../controllers/productsController'

const productsRouter = express.Router()

productsRouter.use(express.json())

productsRouter.get('/:id', productsControllrer.getProductById)
productsRouter.post('/:id', productsControllrer.createNewProduct)
productsRouter.patch('/:id', productsControllrer.updateProductInfo)
productsRouter.delete('/:id', productsControllrer.deleteProduct)

productsRouter.get('/', productsControllrer.getProducts)




export default productsRouter