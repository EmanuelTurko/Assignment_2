"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../Models/post_model"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.owner;
    let posts;
    try {
        if (filter) {
            posts = yield post_model_1.default.find({ owner: filter });
        }
        else {
            posts = yield post_model_1.default.find();
        }
        res.json(posts);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new post_model_1.default({
        title: req.body.title,
        content: req.body.content,
        owner: req.body.owner,
    });
    try {
        const savedPost = yield post.save();
        res.json(savedPost);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params._id);
        res.json(post);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params._id, { $set: req.body }, { new: true });
        res.json(updatedPost);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const postController = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost
};
exports.default = postController;
