import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/auth.js';
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';

const postRouter = express.Router()

postRouter.post('/add', upload.array('media', 4), protect, addPost)
postRouter.get('/feed', protect, getFeedPosts);
postRouter.get('/like', protect, likePost);

export default postRouter
