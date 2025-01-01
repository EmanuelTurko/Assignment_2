import express from 'express';
const postRoutes = express.Router();
import postController from '../Controller/post_controller';

postRoutes.get('/', postController.getAllPosts);
postRoutes.post('/', postController.createPost);
postRoutes.get('/:_id', postController.getPostById);
postRoutes.put('/:_id', postController.updatePost);


export default postRoutes;