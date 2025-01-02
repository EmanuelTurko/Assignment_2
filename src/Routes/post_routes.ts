import express from 'express';
import postController from '../Controller/post_controller';

const postRoutes = express.Router();

postRoutes.get('/',postController.getAllPosts);
postRoutes.post('/',postController.createPost);
postRoutes.get('/:_id', postController.getPostById);
postRoutes.put('/:_id', postController.updatePost);


export default postRoutes;