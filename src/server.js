"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const post_routes_1 = __importDefault(require("./Routes/post_routes"));
const comment_routes_1 = __importDefault(require("./Routes/comment_routes"));
const auth_routes_1 = __importDefault(require("./Routes/auth_routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes setup
app.use('/posts', post_routes_1.default);
app.use('/posts/:postId/comments', comment_routes_1.default);
app.use('/auth', auth_routes_1.default);
// Root route setup to avoid 404 errors
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});
// Database connection and app initialization
const appInit = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.DB_CONNECT) {
            throw new Error('Please set the DB_CONNECT environment variable');
        }
        yield mongoose_1.default.connect(process.env.DB_CONNECT);
        console.log('Connected to DB');
        return app;
    }
    catch (err) {
        console.error(err);
        throw new Error('Failed to initialize app');
    }
});
exports.default = appInit;
