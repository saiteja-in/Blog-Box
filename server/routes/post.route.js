import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/create-post',verifyUser, createPost);
router.get('/getPosts',getPosts);
router.delete('/deletePost/:postId/:userId',verifyUser,deletePost);
router.put('/updatePost/:postId/:userId',verifyUser,updatePost);
export default router;