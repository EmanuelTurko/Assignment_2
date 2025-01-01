"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentRoutes = express_1.default.Router();
const comment_controller_1 = __importDefault(require("../Controller/comment_controller"));
commentRoutes.get('/:postId/comments', comment_controller_1.default.readComments);
commentRoutes.post('/:postId/comments', comment_controller_1.default.createComment);
commentRoutes.put('/:postId/comments/:commentId', comment_controller_1.default.updateComment);
commentRoutes.delete('/:postId/comments/:commentId', comment_controller_1.default.deleteComments);
commentRoutes.delete('/:postId/comments', comment_controller_1.default.deleteComments);
exports.default = commentRoutes;
