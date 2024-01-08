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
		validate: isEmail,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		select: false,
	},
	isActivated: {
		type: Boolean,
		default: false,
	},
	username: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 20,
		trim: true,
	},
	description: {
		type: String,
		minLength: 10,
		maxLength: 160,
		trim: true,
	},
	profilePicture: {
		type: String,
		default: '',
	},
	birthDate: Date,
	gender: {
		type: String,
		enum: ['Male', 'Female'],
	},
	country: String,
	interests: [String],
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
