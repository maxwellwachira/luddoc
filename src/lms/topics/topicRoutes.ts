import express from 'express';

import {
    createTopic,
    getAllTopics,
    getOneTopic,
    removeTopic,
    updateTopic
} from './topicController';

import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();
//protected routes
//router.use(authMiddleware);
//create topic
router.post('/', createTopic);
//Get all topics
router.get('/:courseId', getAllTopics);
//get one topic
router.get('/single-topic/:id', getOneTopic);
//update topic
router.put('/:id', updateTopic);
//delete topic
router.delete('/:id', removeTopic);

export default router;