import express from 'express';

import {
    createUser,
    getAllStudents,
    getAllTutors,
    getAllUsers,
    getOneUser,
    removeUser,
    updateUser
} from './userController';

const router = express.Router();

//create user
router.post('/', createUser);
//Get all users
router.get('/', getAllUsers);
//Get all students
router.get('/students', getAllStudents);
//Get all tutors
router.get('/tutors', getAllTutors);
//get one user
router.get('/:id', getOneUser);
//update user
router.put('/:id', updateUser);
//delete user
router.delete('/:id', removeUser);

export default router;