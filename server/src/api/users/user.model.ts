import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

export interface IUser {
	_id: mongoose.Types.ObjectId;
	isActivated: boolean;
	username: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		select: false,
	},
	username: {
		type: String,
		required: true,
		minLength: 6,
	},
	isActivated: {
		type: Boolean,
		default: false,
	},
	profilePicture: {
		type: String,
		default: '',
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

const User = mongoose.model('User', userSchema);

export default User;
