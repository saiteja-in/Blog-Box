import express from 'express'
import {verifyUser} from '../utils/verifyUser.js'
import { createComment, getPostComments } from '../controllers/comment.controller.js';
const router=express.Router();

router.post('/createComment',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);

export default router;