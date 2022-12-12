import express from 'express';

import {
    createLesson,
    getAllLessons,
    getOneLesson,
    removeLesson,
    updateLesson
} from './lessonController';

import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();
//protected routes
//router.use(authMiddleware);
//create lesson
router.post('/', createLesson);
//Get all lessons in a course
router.get('/:courseId', getAllLessons);
//get all lessons in a topic
router.get('/topic/:topicId', getAllLessons);
//get one lesson
router.get('/single-lesson/:id', getOneLesson);
//update lesson
router.put('/:id', updateLesson);
//delete lesson
router.delete('/:id', removeLesson);

export default router;