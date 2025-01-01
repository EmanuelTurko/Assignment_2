import express,{Express} from 'express';
const app = express();
import mongoose from 'mongoose';
import  {config as dotenvConfig} from 'dotenv';
dotenvConfig();
import bodyParser from 'body-parser';
import postRoutes from './Routes/post_routes';
import commentRoutes from './Routes/comment_routes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/posts', postRoutes);
app.use('/posts', commentRoutes);


const appInit = async () => {
    return new Promise<Express>(
        (resolve, reject) => {
            const db = mongoose.connection;
            db.on("error", (err) => {
                console.error(err);
            });
            db.once("open", () => {
                console.log("connected to DB");
            });
            if(process.env.DB_CONNECT === undefined) {
                console.error("Please set the DB_CONNECT environment variable");
                reject();
            } else {
                mongoose.connect(process.env.DB_CONNECT).then(() => {
                    console.log("appInit finish");
                });
                resolve(app);
            }
        });
};
    export default appInit;
