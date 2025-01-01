"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comment = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('Comment', Comment);
