import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import dotenv from 'dotenv';
import { dobToAge } from '../../utils';
dotenv.config();

export type IUser = { _id: mongoose.Types.ObjectId } & mongoose.InferSchemaType<
	typeof userSchema
>;

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			validate: isEmail,
			select: false,
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
			maxLength: 260,
			trim: true,
		},
		profilePicture: {
			type: String,
			default: `http://localhost:${process.env.PORT}/img/default.jpg`,
		},
		birthDate: Date,
		age: Number,
		gender: {
			type: String,
			enum: ['Male', 'Female'],
		},
		country: String,
		interests: [String],
		nativeLanguage: String,
		languageLevel: { type: Number, min: 1, max: 6 },
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	if (!this.birthDate) {
		return next();
	}

	const age = dobToAge(this.birthDate);
	this.age = age;

	next();
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
