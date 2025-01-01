"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRoutes = express_1.default.Router();
const post_controller_1 = __importDefault(require("../Controller/post_controller"));
postRoutes.get('/', post_controller_1.default.getAllPosts);
postRoutes.post('/', post_controller_1.default.createPost);
postRoutes.get('/:_id', post_controller_1.default.getPostById);
postRoutes.put('/:_id', post_controller_1.default.updatePost);
exports.default = postRoutes;
