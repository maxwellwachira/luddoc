import express from 'express';

const router = express.Router();

//sign-in route
router.post('/sign-in');
//sign-up route
router.post('/sign-up');

export default router;