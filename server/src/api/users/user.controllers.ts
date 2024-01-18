import { Request, Response, NextFunction } from 'express';
import mongoose, { PipelineStage, UpdateQuery } from 'mongoose';
import User, { IUser } from './user.model';
import AppError from '../../utils/appError';
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

		const options: PipelineStage[] = [
			{
				$match: {
					_id: {
						$ne: new mongoose.Types.ObjectId(req.userId),
					},
					isActivated: true,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		];

		if (req.isActivated) {
			options.push({
				$addFields: {
					matches: {
						$size: {
							$setIntersection: [
								'$interests',
								req.user.interests,
							],
						},
					},
				},
			});

			options.push({
				$sort: { matches: -1, createdAt: -1 },
			});
		}

		// Sorting
		// options.push({
		// 	$sort: req.isActivated
		// 		? { matches: -1, createdAt: -1 }
		// 		: { createdAt: -1 },
		// });

		if (gender) {
			options.push({
				$match: {
					gender,
				},
			});
		}

		if (languageLevel) {
			options.push({
				$match: {
					languageLevel: { $gte: +languageLevel },
				},
			});
		}

		if (country) {
			options.push({
				$match: {
					country,
				},
			});
		}

		// Age
		if (minAge && !maxAge) {
			options.push({
				$match: { age: { $gte: minAge } },
			});
		}
		if (maxAge && !minAge) {
			options.push({
				$match: { age: { $lte: maxAge } },
			});
		}
		if (maxAge && minAge) {
			options.push({
				$match: { age: { $gte: minAge, $lte: maxAge } },
			});
		}

		if (keyword) {
			options.push({
				$match: {
					$or: [
						{
							interests: {
								$in: [new RegExp(keyword as string, 'i')],
							},
						},
						{ description: new RegExp(keyword as string, 'i') },
					],
				},
			});
		}

		// Pagination
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 9;
		const skip = (page - 1) * limit;
		options.push({ $skip: skip }, { $limit: limit });

		const users = await User.aggregate(options);

		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users,
			},
		});

		// const usersQuery = User.find({
		// 	_id: { $ne: req.userId },
		// 	isActivated: true,
		// }).sort({ createdAt: -1 });

		// if (gender) {
		// 	usersQuery.find({ gender });
		// }

		// if (languageLevel) {
		// 	usersQuery.find({ languageLevel: { $gte: languageLevel } });
		// }

		// if (country) {
		// 	usersQuery.where({ country });
		// }

		// if (minAge && !maxAge) {
		// 	usersQuery.find({ age: { $gte: minAge } });
		// }
		// if (maxAge && !minAge) {
		// 	usersQuery.find({ age: { $lte: maxAge } });
		// }
		// if (maxAge && minAge) {
		// 	usersQuery.find({ age: { $gte: minAge, $lte: maxAge } });
		// }

		// if (keyword) {
		// 	usersQuery.find({
		// 		$or: [
		// 			{
		// 				interests: {
		// 					$in: [new RegExp(keyword as string, 'i')],
		// 				},
		// 			},
		// 			{ description: new RegExp(keyword as string, 'i') },
		// 		],
		// 	});
		// }

		// const page = Number(req.query.page) || 1;
		// const limit = Number(req.query.limit) || 9;
		// const skip = (page - 1) * limit;

		// usersQuery.skip(skip).limit(limit);

		// const users = await usersQuery;

		// res.status(200).json({
		// 	status: 'success',
		// 	results: users.length,
		// 	data: {
		// 		users,
		// 	},
		// });
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
		const user = await User.findOne({
			$and: [{ _id: { $ne: req.userId } }, { _id: req.params.id }],
		});

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

export const updateProfilePicture = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const file = req.file;
		if (!file) {
			return next(
				new AppError('Not an image! Please upload only images', 400)
			);
		}
		const user = await User.findByIdAndUpdate(
			req.userId,
			{
				profilePicture: `http://localhost:${process.env.PORT}/img/${file.filename}`,
			},
			{
				new: true,
				runValidators: true,
			}
		);

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

export const deleteProfilePicture = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.userId,
			{
				profilePicture: `http://localhost:${process.env.PORT}/img/default.jpg`,
			},
			{
				new: true,
				runValidators: true,
			}
		);

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
