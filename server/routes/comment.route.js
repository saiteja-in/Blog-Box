import express from 'express'
import {verifyUser} from '../utils/verifyUser.js'
import { createComment, deleteComment, editComment, getPostComments, getcomments, likeComment } from '../controllers/comment.controller.js';
const router=express.Router();

router.post('/createComment',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId',verifyUser,likeComment)
// router.put('/editComment/:commentId', verifyUser, editComment);
// router.delete('/deleteComment/:commentId', verifyUser, deleteComment);
// router.get('/getcomments', verifyUser, getcomments);

export default router;