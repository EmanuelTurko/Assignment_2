import {Request, Response} from 'express';
import User from '../Models/user_model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateTokens = (_id: string):{accessToken:string,refreshToken:string} | null => {
    const rand= Math.floor(Math.random() * 1000000);
    if(process.env.TOKEN_SECRET === undefined){
        return null;
    }
    const accessToken = jwt.sign(
        {
            _id: _id,
            rand: rand
        },
        process.env.TOKEN_SECRET,
            {expiresIn: process.env.TOKEN_EXPIRATION});
    const refreshToken = jwt.sign(
        {
            _id: _id,
            rand: rand
        },
        process.env.TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION});

    return {accessToken, refreshToken};
}

const register = async (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !email || !password){
         res.status(400).json({message: 'Please enter all fields'});
         return;
    }
    try {
        const emailTaken = await User.findOne({email: email});
        if(emailTaken){
            res.status(400).json({message: 'Email already exists'});
            return;
        }
        const userTaken = await User.findOne({username: username});
        if(userTaken){
            res.status(400).json({message: 'Username already exists'});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(200).send(user);
        } catch(err){
            res.status(400).json({message: err});
        }
    }
const login = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({username: username});
        if(!user){
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }
        const tokens = generateTokens(user._id.toString());
        if(!tokens){
            res.status(400).json({message: 'Server error'});
            return;
        }
        if (user.refreshToken === undefined){
            user.refreshToken = [];
        }
        user.refreshToken.push(tokens.refreshToken);
        await user.save()

        res.status(200).send({
            username: user.username,
            _id: user._id,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        })
    } catch(err){
        res.status(401).json({message: err});
    }
}
const logout = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        res.status(400).json({message: 'Token Error'});
        return;
    }
    try {
        const user = await User.findOne({refreshToken: refreshToken});
        if(!user){
            res.status(400).json({message: 'Invalid refresh token'});
            return;
        }
        const index = user.refreshToken.indexOf(refreshToken);
        user.refreshToken.splice(index, 1);
        await user.save();
        res.status(200).json({message: 'Logged out successfully'});
    } catch(err){
        res.status(400).json({message: err});
    }
}
const authController = {
    register,
    login,
    logout
}
export default authController;
