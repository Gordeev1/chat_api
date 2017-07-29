import Joi from 'joi';
import { MESSAGES_PER_REQUEST, CHATS_PER_REQUEST } from '@constants';
import { UserSchema, ChatSchema, AuthHeadersSchema, MessageSchema } from '@utils/schemas';

export const get = {
    validate: {
        query: Joi.object({
            skip: Joi.number().min(0),
            limit: Joi.number().min(0).default(CHATS_PER_REQUEST)
        })
    },
    response: {
        schema: Joi.array().items(ChatSchema)
    }
}

export const getById = {
    validate: {
        params: Joi.object({
            id: Joi.string()
        })
    },
    response: {
        schema: ChatSchema
    }
}

export const post = {
    validate: {
        headers: AuthHeadersSchema,
        payload: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string()
        })
    },
    response: {
        schema: ChatSchema
    }
}

export const getMessages = {
    validate: {
        headers: AuthHeadersSchema,
        params: Joi.object({
            id: Joi.string()
        }),
        query: Joi.object({
            skip: Joi.number().min(0),
            limit: Joi.number().min(0).default(MESSAGES_PER_REQUEST)
        })
    },
    response: {
        schema: Joi.array().items(MessageSchema)
    }
}

export const postMessage = {
    validate: {
        headers: AuthHeadersSchema,
        params: Joi.object({
            id: Joi.string()
        }),
        payload: Joi.object().keys({
            text: Joi.string()
        })
    },
    response: {
        schema: MessageSchema
    }
}

export const getMembers = {
    validate: {
        headers: AuthHeadersSchema,
        params: Joi.object({
            id: Joi.string()
        })
    },
    response: {
        schema: Joi.array().items(UserSchema)
    }
}