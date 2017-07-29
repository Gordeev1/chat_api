import Joi from 'joi';

export const AuthHeadersSchema = Joi.object().keys({
    Authorization: Joi.string()
}).unknown()

export const UserSchema = Joi.object().keys({
    _id: Joi.any(),
    name: Joi.string(),
    email: Joi.string().email(),
    avatar: Joi.string(),
    gender: Joi.valid(['male', 'female']),
    birthday: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    chats: Joi.array()
}).unknown(true)

export const MessageSchema = Joi.object().keys({
    _id: Joi.any(),
    author: [Joi.string(), UserSchema],
    text: Joi.string(),
    attachment: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
}).unknown(true)

export const ChatSchema = Joi.object().keys({
    _id: Joi.any(),
    avatar: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid(['public', 'private']),
    creator: [Joi.string(), UserSchema],
    messages: Joi.array().items(MessageSchema, Joi.string()),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
}).unknown(true)