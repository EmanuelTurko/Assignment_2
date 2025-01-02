import express from 'express';
const postRoutes = express.Router();
import postController from '../Controller/post_controller';
import { authMiddleware } from '../Controller/auth_controller';
postRoutes.get('/', authMiddleware, postController.getAllPosts);
postRoutes.post('/', authMiddleware, postController.createPost);
postRoutes.get('/:_id', authMiddleware, postController.getPostById);
postRoutes.put('/:_id', authMiddleware, postController.updatePost);
export default postRoutes;
