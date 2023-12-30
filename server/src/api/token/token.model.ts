import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
