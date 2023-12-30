import { Request, NextFunction, Response } from 'express';

export const verifyStatus = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// if (!req.isActivated) {
	// 	res.status(403);
	// 	return next(new Error('Your account is not activated'));
	// }

	next();
};
