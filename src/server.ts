import express, { Express } from 'express';
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import bodyParser from 'body-parser';
import postRoutes from './Routes/post_routes';
import commentRoutes from './Routes/comment_routes';
import authRoutes from './Routes/auth_routes';

dotenvConfig();

const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use('/posts', postRoutes);
app.use('/posts/:postId/comments', commentRoutes);
app.use('/auth', authRoutes);

// Root route setup to avoid 404 errors
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Database connection and app initialization
const appInit = async (): Promise<Express> => {
    try {
        if (!process.env.DB_CONNECT) {
            throw new Error('Please set the DB_CONNECT environment variable');
        }

        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to DB');
        return app;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to initialize app');
    }
};

export default appInit;
