import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessToken } from '../api/token/token.types';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const auth = req.headers.authorization;
	const token = auth && auth.startsWith('Bearer') ? auth.split(' ')[1] : null;

	if (!token) {
		res.status(401);
		return next(new Error('You are not logged in. No token'));
	}

	const decoded = jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET!
	) as AccessToken;

	console.log('ver!');

	req.isActivated = decoded.isActivated;

	next();
};
