import express from 'express';
const commentRoutes = express.Router();
import commentController from '../Controller/comment_controller';

commentRoutes.get('/', commentController.readComments);

commentRoutes.post('/', commentController.createComment);

commentRoutes.put('/:commentId', commentController.updateComment);

commentRoutes.delete('/:commentId', commentController.deleteComments);

export default commentRoutes;