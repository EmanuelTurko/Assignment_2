import {Request, Response} from 'express';
import Comment from '../Models/comment_model';

const createComment = async(req: Request, res: Response) => {
    const {content, owner, post_id} = req.body;
    const comment = new Comment({
        content,
        owner,
        post_id
    });
    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (error) {
        res.json({message: error});
    }
}
const readComments = async(req: Request, res: Response) => {
    const postId = req.params.post_id;
    let comment
    try {
        if(postId){
            comment = await Comment.find({post_id: postId});
        } else {
            comment = await Comment.find({});
        }
        res.json(comment);
    } catch (error) {
        res.json({message: error});
    }
}
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
    const filter = req.query.commentId;
    let deletedComment
    try {
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