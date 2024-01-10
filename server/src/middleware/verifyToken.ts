import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessToken } from '../api/token/token.types';
import AppError from '../utils/appError';
import User from '../api/users/user.model';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { accessToken } = req.cookies;

		if (!accessToken) {
			return next(new AppError('You are not logged in. No token', 401));
		}

		const userData = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET!
		) as AccessToken;

		const currentUser = await User.findById(userData.userId);

		if (!currentUser) {
			return next(
				new AppError(
					'The user belonging to this token does no longer exist',
					401
				)
			);
		}

		req.userId = userData.userId;
		req.isActivated = userData.isActivated;

		next();
	} catch (err) {
		next(err);
	}
};
