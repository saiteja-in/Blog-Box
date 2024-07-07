import express from 'express'
import {deleteUser, getUser, getUsers, test, updateUser} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
import { signout } from '../controllers/auth.controller.js';
const router=express.Router();

router.get('/test',test)
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signout)
router.get('/getusers',verifyUser,getUsers)
router.get('/:userId', getUser);

export default router;