import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

import authRouter from './api/auth/auth.router';
import userRouter from './api/users/user.router';
import messageRouter from './api/messages/message.router';
import * as middlewares from './middleware/globalErrorHandler';

dotenv.config();

const app = express();

app.use(compression());
app.use(
    cors({
        origin: [process.env.CLIENT_URL!, process.env.CLIENT_URL_PREVIEW!],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
