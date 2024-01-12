import { Request, Response, NextFunction } from 'express';
import User, { IUser } from './user.model';
import AppError from '../../utils/appError';
import { UpdateQuery } from 'mongoose';
import upload from '../../config/multer';

export const uploadUserPhoto = upload.single('profilePicture');

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { gender, country, languageLevel, keyword } = req.query;
		const minAge = Number(req.query.minAge);
		const maxAge = Number(req.query.maxAge);

		const usersQuery = User.find({
			_id: { $ne: req.userId },
			isActivated: true,
		}).sort({ createdAt: -1 });

		if (gender) {
			usersQuery.find({ gender });
		}

		if (languageLevel) {
			usersQuery.find({ languageLevel: { $gte: languageLevel } });
		}

		if (country) {
			usersQuery.where({ country });
		}

		if (minAge && !maxAge) {
			usersQuery.find({ age: { $gte: minAge } });
		}
		if (maxAge && !minAge) {
			usersQuery.find({ age: { $lte: maxAge } });
		}
		if (maxAge && minAge) {
			usersQuery.find({ age: { $gte: minAge, $lte: maxAge } });
		}

		if (keyword) {
			usersQuery.find({
				$or: [
					{
						interests: {
							$in: [new RegExp(keyword as string, 'i')],
						},
					},
					{ description: new RegExp(keyword as string, 'i') },
				],
			});
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
		console.log(req.file);

		const body: UpdateQuery<IUser> = {
			username: req.body.username,
			description: req.body.description,
			gender: req.body.gender,
			birthDate: req.body.birthDate,
			interests: req.body.interests,
			country: req.body.country,
			nativeLanguage: req.body.nativeLanguage,
			languageLevel: req.body.languageLevel,
		};

		if (req.file) {
			body.profilePicture = `http://localhost:${process.env.PORT}/img/${req.file.filename}`;
		}

		const updatedUser = await User.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

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
