import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import AppError from '../../utils/appError';

// AGE min 14 max 70

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { gender, country, minAge, maxAge } = req.query;
		// _id: { $ne: req.userId },
		// isActivated: true,

		const usersQuery = User.find();

		if (gender) {
			usersQuery.where('gender').equals(gender);
		}

		if (country) {
			usersQuery.where('country').equals(country);
		}

		const users = await usersQuery;

		res.status(200).json({
			status: 'success',
			results: users.length,
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

export const getCurrentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findById(req.userId);

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

export const updateCurrentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.userId;
		const {
			username,
			description,
			profilePicture,
			gender,
			country,
			birthDate,
			interests,
		} = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				username,
				description,
				profilePicture,
				gender,
				country,
				birthDate,
				interests,
			},
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: 'success',
			data: {
				user: updatedUser,
			},
		});
	} catch (e) {
		next(e);
	}
};
