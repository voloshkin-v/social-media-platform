import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './api/auth/auth.router';
import userRouter from './api/users/user.router';
import * as middlewares from './middleware/globalErrorHandler';

dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
