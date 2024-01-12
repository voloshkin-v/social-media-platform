import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
	{
		fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
		toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
		message: { type: String, min: 10 },
		viewed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
