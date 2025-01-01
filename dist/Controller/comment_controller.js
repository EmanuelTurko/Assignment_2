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
const comment_model_1 = __importDefault(require("../Models/comment_model"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, owner, post_id } = req.body;
    const comment = new comment_model_1.default({
        content,
        owner,
        post_id
    });
    try {
        const savedComment = yield comment.save();
        res.json(savedComment);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const readComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.post_id;
    let comment;
    try {
        if (postId) {
            comment = yield comment_model_1.default.find({ post_id: postId });
        }
        else {
            comment = yield comment_model_1.default.find({});
        }
        res.json(comment);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedComment = yield comment_model_1.default.findByIdAndUpdate(req.params.commentId, { $set: req.body }, { new: true });
        res.json(updatedComment);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const deleteComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.commentId;
    let deletedComment;
    try {
        if (filter) {
            deletedComment = yield comment_model_1.default.findByIdAndDelete(filter);
        }
        else {
            deletedComment = yield comment_model_1.default.deleteMany({ post_id: req.params.postId });
        }
        res.json(deletedComment);
    }
    catch (error) {
        res.json({ message: error });
    }
});
const commentController = {
    createComment,
    readComments,
    updateComment,
    deleteComments
};
exports.default = commentController;
