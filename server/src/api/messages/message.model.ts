import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		message: { type: String, minLength: 10, required: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
