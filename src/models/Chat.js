import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
    {
        avatar: String,
        name: String,
        description: String,
        type: {
            type: String,
            enum: ['public', 'private']
        },
        creator: { type: Schema.ObjectId, ref: 'user' },
        messages: [{ type: Schema.ObjectId, ref: 'message' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('chat', MessageSchema);
