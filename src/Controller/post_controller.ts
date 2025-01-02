import {Request, Response} from 'express';
import Post from '../Models/post_model';


const getAllPosts = async (req: Request, res: Response) => {
    try{
        const filter = req.query.owner;
        const posts = filter? await Post.find({owner: filter}) : await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({message: error});
    }
}
const createPost = async(req: Request, res: Response) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            owner: req.body.owner,
    });
        const savedPost = await post.save();
        res.status(200).send(savedPost);
    } catch (error) {
        res.status(401).send({message: error});
    }
}
const getPostById = async(req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params._id);
        if(!post){
            res.status(404).send({message: "Post not found"});
            return;
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(402).send({message: error});
    }
}
const updatePost = async(req: Request, res: Response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate
        (req.params._id,
            {$set: req.body},
            {new: true}
        );
        if(!updatedPost){
            res.status(404).send({message: "Post not found"});
            return;
        }
        res.status(200).send(updatedPost);
          } catch (error) {
        res.status(403).send({message: error});
    }
}
const postController = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost
}
export default postController;