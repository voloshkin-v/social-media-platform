import { NextFunction, Request, Response } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404);
	const error = new Error(`Not found: ${req.originalUrl}`);

	next(error);
};

/*
Error structure

status: 'fail' | 'error'
message: str
*/

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

	res.status(statusCode).json({
		status: 'status',
		message: err.message,
	});
};
