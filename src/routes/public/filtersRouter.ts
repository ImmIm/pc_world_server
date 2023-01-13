import express from 'express';
import filtersController from '../../controllers/filtersController';


export const filtersRouter = express.Router();


filtersRouter.route('/').get(filtersController.getFiltersForCategoryName)