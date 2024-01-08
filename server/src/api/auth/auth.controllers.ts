import { Request, Response, NextFunction } from 'express';
import { IUser } from '../users/user.model';
import { RefreshToken } from '../token/token.types';
import * as tokenService from '../token/token.services';
import User from '../users/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../utils/appError';

const createSendTokens = async (
	user: IUser,
	statusCode: number,
	res: Response,
	next: NextFunction
) => {
	try {
		const tokens = tokenService.generateTokens({
			userId: user._id,
			isActivated: user.isActivated,
		});

		await tokenService.saveToken({
			userId: user._id,
			refreshToken: tokens.refreshToken,
		});

		res.cookie('refreshToken', tokens.refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7d,
		});

		res.cookie('accessToken', tokens.accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000, // 1h
			// maxAge: 15 * 60 * 1000, // 15m
		});

		res.status(statusCode).json({
			status: 'success',
		});
	} catch (e) {
		next(e);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password, confirmPassword, username } = req.body;

		const isUserExist = await User.findOne({ email });
		if (isUserExist) {
			return next(
				new AppError('The user with this email already exists', 400)
			);
		}

		if (password !== confirmPassword) {
			return next(new AppError('Passwords do not match', 400));
		}

		const user = await User.create({
			email,
			password,
			username,
		});

		createSendTokens(user, 201, res, next);
	} catch (err) {
		next(err);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new AppError('Email and password are required', 400));
		}

		const user = await User.findOne({ email }).select('+password');
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return next(new AppError('Incorrect email or password', 401));
		}

		createSendTokens(user, 200, res, next);
	} catch (err) {
		next(err);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.cookies;
		await tokenService.deleteToken(refreshToken);

		res.clearCookie('refreshToken');
		res.clearCookie('accessToken');

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		next(err);
	}
};

export const refresh = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) {
			return next(new AppError('No token. Access denied', 401));
		}

		const userData = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET!
		) as RefreshToken;

		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!tokenFromDb) {
			return next(
				new AppError(
					'This token does not belong to you. Access denied',
					401
				)
			);
		}

		const user = await User.findById(userData.userId);
		if (!user) {
			return next(new AppError('User not found. Access denied', 401));
		}

		createSendTokens(user, 200, res, next);
	} catch (err) {
		next(err);
	}
};
