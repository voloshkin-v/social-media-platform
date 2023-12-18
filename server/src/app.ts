import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import postRouter from './api/posts/post.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/posts', postRouter);

export default app;
