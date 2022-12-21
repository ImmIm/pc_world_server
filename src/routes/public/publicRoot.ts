import express from 'express'
import productsRouter from './productsRouter'


const publicRoute = express.Router()


publicRoute.use('products', productsRouter)

export default publicRoute