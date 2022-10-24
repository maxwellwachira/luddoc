import express from 'express';

import {
    createCategory,
    getAllCategories,
    getOneCategory,
    removeCategory,
    updateCategory
} from './categoryController';

import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();
//protected routes
//router.use(authMiddleware);
//create category
router.post('/', createCategory);
//Get all categories
router.get('/', getAllCategories);
//get one category
router.get('/:id', getOneCategory);
//update category
router.put('/:id', updateCategory);
//delete category
router.delete('/:id', removeCategory);

export default router;