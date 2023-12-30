import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../users/user.model';
import * as tokenService from '../token/token.services';
import { IUser } from '../users/user.model';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../token/token.types';

const createSendTokens = (user: IUser, statusCode: number, res: Response) => {
	const tokens = tokenService.generateTokens({
		userId: user._id,
		isActivated: user.isActivated,
	});
	tokenService.saveToken({
		userId: user._id,
		refreshToken: tokens.refreshToken,
	});

	res.cookie('refreshToken', tokens.refreshToken, {
		httpOnly: true,
		maxAge: +process.env.REFRESH_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000,
	});

	res.status(statusCode).json({
		token: tokens.accessToken,
		user: {
			_id: user._id,
			username: user.username,
			isActivated: user.isActivated,
		},
	});
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password, confirmPassword, username } = req.body;

		if (password !== confirmPassword) {
			res.status(400);
			return next(new Error('Passwords do not match'));
		}

		const user = await User.create({
			email,
			password,
			username,
		});

		createSendTokens(user, 201, res);
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
			res.status(400);
			return next(new Error('Email and password are required'));
		}

		const user = await User.findOne({ email }).select('+password');
		if (!user || !(await bcrypt.compare(password, user.password))) {
			res.status(401);
			return next(new Error('Incorrect email or password'));
		}

		createSendTokens(user, 200, res);
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

		if (!refreshToken) {
			return res.sendStatus(204);
		}

		tokenService.deleteToken(refreshToken);
		res.clearCookie('refreshToken');

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
			res.status(401);
			return next(new Error('No token. Access denied'));
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET!
		) as RefreshToken;

		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!tokenFromDb) {
			res.status(401);
			return next(new Error('Token not found. Access denied'));
		}

		const user = await User.findById(decoded.userId);

		if (!user) {
			res.status(401);
			return next(new Error('User not found. Access denied'));
		}

		createSendTokens(user, 200, res);
	} catch (err) {
		next(err);
	}
};
