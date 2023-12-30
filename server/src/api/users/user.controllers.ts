import { Request, Response, NextFunction } from 'express';
import User from './user.model';

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await User.find();

		res.status(200).json({
			users,
		});
	} catch (e) {
		next(e);
	}
};
