import {Request, Response} from 'express';
import Comment from '../Models/comment_model';
import mongoose from 'mongoose';

const createComment = async (req: Request, res: Response) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            owner: req.body.owner,
            postId: req.body.postId.toString(),
        });
        const savedComment = await comment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        res.status(401).send({message: error});
    }
};
const readComments = async (req: Request, res: Response) => {
    try {
      const filter = req.params.owner;
      const comments = filter? await Comment.find({owner: filter}) : await Comment.find();
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send({message: error});
    }
};
const updateComment = async(req: Request, res: Response) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate
        (req.params.commentId,
            {$set: req.body},
            {new: true}
        );
        res.json(updatedComment);
          } catch (error) {
        res.json({message: error});
    }
}
const deleteComments = async(req: Request, res: Response) => {
    try {
    const filter = req.query.commentId;
    let deletedComment
        if(filter){
            deletedComment = await Comment.findByIdAndDelete(filter);
        } else {
            deletedComment = await Comment.deleteMany({post_id: req.params.postId});
        }
        res.json(deletedComment);
    } catch (error) {
        res.json({message: error});
    }
}
const commentController = {
    createComment,
    readComments,
    updateComment,
    deleteComments
}
export default commentController;