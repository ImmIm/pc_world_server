import express from 'express';
import categoriesController from '../../controllers/categoriesController';


const categoryRouter = express.Router()


// get all categories
categoryRouter.route('/').get(categoriesController.getAllCategories)
// get one category
categoryRouter.route('/:id').get(categoriesController.getCategory)
// get filters for category
categoryRouter.route('/:id/filters')

export default categoryRouter