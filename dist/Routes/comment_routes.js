import express from 'express';
const commentRoutes = express.Router();
import commentController from '../Controller/comment_controller';
commentRoutes.get('/:postId/comments', commentController.readComments);
commentRoutes.post('/:postId/comments', commentController.createComment);
commentRoutes.put('/:postId/comments/:commentId', commentController.updateComment);
commentRoutes.delete('/:postId/comments/:commentId', commentController.deleteComments);
commentRoutes.delete('/:postId/comments', commentController.deleteComments);
export default commentRoutes;
