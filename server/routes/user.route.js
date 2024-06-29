import express from 'express'
import {deleteUser, test, updateUser} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
import { signout } from '../controllers/auth.controller.js';
const router=express.Router();

router.get('/test',test)
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signout)

export default router;