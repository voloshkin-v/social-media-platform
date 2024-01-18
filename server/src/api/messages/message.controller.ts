import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/appError';
import User from '../users/user.model';
import Message from './message.model';
import mongoose from 'mongoose';

export const sendMessage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { recipientId, message } = req.body;
		if (!recipientId) {
			return next(new AppError('recipientId not provided', 400));
		}

		const user = await User.findById(recipientId);
		if (!user) {
			return next(new AppError('User not found', 404));
		}
		if (!user.isActivated) {
			return next(new AppError('User is not activated', 400));
		}

		const messageData = await Message.create({
			message,
			recipient: user.id,
			sender: req.userId,
		});

		res.status(201).json({
			status: 'success',
			data: {
				message: messageData,
			},
		});
	} catch (e) {
		next(e);
	}
};

export const getMessages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const status = req.query.status || 'received';
		let messages;

		if (status === 'received') {
			messages = await Message.find({
				recipient: req.userId,
			})
				.populate('sender', 'username profilePicture')
				.sort({ createdAt: -1 });
		}

		if (status === 'sent') {
			messages = await Message.find({
				sender: {
					_id: req.userId,
				},
			})
				.populate('recipient', 'username profilePicture')
				.sort({ createdAt: -1 });
		}

		res.status(200).json({
			status: 'success',
			messagesStatus: status,
			data: {
				messages,
			},
		});
	} catch (e) {
		next(e);
	}
};
