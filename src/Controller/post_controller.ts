import {Request, Response} from 'express';
import Post from '../Models/post_model';


const getAllPosts = async (req: Request, res: Response) => {
    const filter = req.query.owner;
    let posts
    try {
        if(filter){
            posts = await Post.find({owner:filter});
        } else {
            posts = await Post.find();
        }
        res.json(posts);
    } catch (error) {
        res.json({message: error});
    }
}
const createPost = async(req: Request, res: Response) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        owner: req.body.owner,
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({message: error});
    }
}
const getPostById = async(req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params._id);
        res.json(post);
    } catch (error) {
        res.json({message: error});
    }
}
const updatePost = async(req: Request, res: Response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate
        (req.params._id,
            {$set: req.body},
            {new: true}
        );
        res.json(updatedPost);
          } catch (error) {
        res.json({message: error});
    }
}
const postController = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost
}
export default postController;