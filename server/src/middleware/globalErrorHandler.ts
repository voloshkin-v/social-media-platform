import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { Error } from 'mongoose';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`Not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof Error.CastError) {
		return res.status(400).json({
			status: 'fail',
			message: `Invalid ${err.path}: ${err.value}`,
		});
	}

	if (err instanceof Error.ValidationError) {
		const errors = Object.values(err.errors).map((el) => el.message);
		const message = `Invalid input data. ${errors.join('. ')}`;

		return res.status(400).json({
			status: 'fail',
			message,
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	res.status(500).json({
		status: 'error',
		message: 'An unknown error occurred',
		err,
	});
};
