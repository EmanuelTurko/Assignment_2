import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min: 6,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    refreshToken:{
        type: [String],
        default: []
    }
});
const User = mongoose.model('User', user);
export default User;