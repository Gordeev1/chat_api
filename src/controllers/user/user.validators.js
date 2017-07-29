import Joi from 'joi';
import { ChatSchema, AuthHeadersSchema } from '@utils/schemas';
import { CHATS_PER_REQUEST } from '@constants';

export const getChats = {
    validate: {
        headers: AuthHeadersSchema,
        query: Joi.object({
            skip: Joi.number().min(0),
            limit: Joi.number().min(0).default(CHATS_PER_REQUEST)
        })
    },
    response: {
        schema: Joi.array().items(ChatSchema)
    }
}

export const postChat = {
    validate: {
        headers: AuthHeadersSchema,
        params: Joi.object({
            id: Joi.string()
        })
    },
    response: {
        schema: Joi.object({
            id: Joi.string()
        })
    }
}