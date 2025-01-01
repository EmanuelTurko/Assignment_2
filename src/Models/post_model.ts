import mongoose from 'mongoose';


const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Post', Post);