import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import AppError from '../../utils/appError';

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await User.find();

		res.status(200).json({
			data: {
				users,
			},
		});
	} catch (e) {
		next(e);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return next(new AppError('No user found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (e) {
		next(e);
	}
};

export const updateMe = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		res.status(200).json({
			status: 'success',
		});
	} catch (e) {
		next(e);
	}
};
