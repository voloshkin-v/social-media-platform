import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Token from './token.model';

type UserId = mongoose.Types.ObjectId;

export const generateTokens = ({
	userId,
	isActivated,
}: {
	userId: UserId;
	isActivated: boolean;
}) => {
	const accessToken = jwt.sign(
		{ userId, isActivated },
		process.env.ACCESS_TOKEN_SECRET!,
		{
			expiresIn: process.env.ACCESS_EXPIRES_IN,
		}
	);

	const refreshToken = jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: process.env.REFRESH_EXPIRES_IN,
		}
	);

	return { accessToken, refreshToken };
};

export const saveToken = async ({
	userId,
	refreshToken,
}: {
	userId: any;
	refreshToken: string;
}) => {
	const tokenData = await Token.findOne({ id: userId });

	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}

	const token = await Token.create({ id: userId, refreshToken });
	return token;
};

export const deleteToken = async (refreshToken: string) => {
	const token = await Token.deleteOne({ refreshToken });
	return token;
};

export const findToken = async (refreshToken: string) => {
	const token = await Token.findOne({ refreshToken });
	return token;
};
