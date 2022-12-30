import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/create/:id', createPost)
router.patch('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)

export default router