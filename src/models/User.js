import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        avatar: String,
        facebook: String,
        birthday: Date,
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        push_id: String,
        chats: [{ type: Schema.ObjectId, ref: 'chat' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('user', UserSchema);
