import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessToken } from '../api/token/token.types';
import AppError from '../utils/appError';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const auth = req.headers.authorization;
		const token =
			auth && auth.startsWith('Bearer') ? auth.split(' ')[1] : null;

		if (!token) {
			return next(new AppError('You are not logged in. No token', 401));
		}

		const userData = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET!
		) as AccessToken;

		req.userId = userData.userId;
		req.isActivated = userData.isActivated;

		next();
	} catch (err) {
		next(err);
	}
};
