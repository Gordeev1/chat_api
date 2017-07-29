import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
    {
        author: { type: Schema.ObjectId, ref: 'user' },
        text: String,
        attachment: [String]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('message', MessageSchema);
