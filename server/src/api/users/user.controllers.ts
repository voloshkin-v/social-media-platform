import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import AppError from '../../utils/appError';

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { gender, country } = req.query;

		const usersQuery = User.find({
			_id: { $ne: req.userId },
			isActivated: true,
		}).sort({ createdAt: -1 });

		if (gender) {
			usersQuery.where('gender').equals(gender);
		}

		if (country) {
			usersQuery.where('country').equals(country);
		}

		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 9;
		const skip = (page - 1) * limit;

		usersQuery.skip(skip).limit(limit);

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
			gender,
			birthDate,
			interests,
			country,
			nativeLanguage,
			languageLevel,
		} = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				username,
				description,
				gender,
				birthDate,
				interests,
				country,
				nativeLanguage,
				languageLevel,
			},
			{
				new: true,
				runValidators: true,
			}
		);

		if (!updatedUser) {
			return next(new AppError('User could not be updated', 400));
		}

		if (
			updatedUser.username &&
			updatedUser.description &&
			updatedUser.nativeLanguage &&
			updatedUser.birthDate &&
			updatedUser.gender &&
			updatedUser.country &&
			updatedUser.languageLevel &&
			updatedUser.interests.length > 0
		) {
			updatedUser.isActivated = true;
			await updatedUser.save();
		} else {
			updatedUser.isActivated = false;
			await updatedUser.save();
		}

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
