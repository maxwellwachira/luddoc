import express from 'express';

const router = express.Router();

//sign-in route
router.post('/sign-in');
//sign-up route
router.post('/sign-up');
//forgot password
router.post('forgot-password');
//reset password
router.post('/reset-password');

export default router;