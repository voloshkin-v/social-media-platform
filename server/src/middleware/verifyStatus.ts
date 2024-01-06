import { Request, NextFunction, Response } from 'express';
import AppError from '../utils/appError';

export const verifyStatus = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isActivated) {
		return next(new AppError('Your account is not activated', 403));
	}

	next();
};
