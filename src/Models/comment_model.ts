import mongoose from 'mongoose';

const Comment = new mongoose.Schema({
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

export default mongoose.model('Comment', Comment);