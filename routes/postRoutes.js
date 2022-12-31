import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js';
import { verifyUser } from '../middleware/verifyUser.js';




const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/create', verifyUser, createPost)
router.patch('/update/:id',verifyUser, updatePost)
router.delete('/delete/:id',verifyUser, deletePost)

export default router