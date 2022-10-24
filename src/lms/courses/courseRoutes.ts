import express from 'express';

import {
    createCourse,
    getAllCourses,
    getAllCoursesInCategory,
    getOneCourse,
    removeCourse,
    searchCourse,
    updateCourse
} from './courseController';

import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

//protected routes
//router.use(authMiddleware);
//create course
router.post('/', createCourse);
//Get all courses
router.get('/', getAllCourses);
//courses by category
router.get('/category/:categoryId', getAllCoursesInCategory)
//Get all tutors
router.get('/search', searchCourse);
//get one course
router.get('/:id', getOneCourse);
//update course
router.put('/:id', updateCourse);
//delete course
router.delete('/:id', removeCourse);

export default router;