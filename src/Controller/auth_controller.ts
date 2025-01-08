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
         return;
    }
    try {
        const emailTaken = await User.findOne({email: email});
        if(emailTaken){
            return;
        }
        const userTaken = await User.findOne({username: username});
        if(userTaken){
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
        }
    }
const login = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({username: username});
        if(!user){
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return;
        }
        const tokens = generateTokens(user._id.toString());
        if(!tokens){
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
    }
}
const logout = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return;
    }
        try {
            if (!user) {
                return;
            }
                await user.save();
        } catch(err) {
        }
}
const authController = {
    register,
    login,
}
export default authController;
