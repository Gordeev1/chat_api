import Joi from 'joi';
import { UserSchema } from '@utils/schemas';

export const sign = {
    validate: {
        params: Joi.object({
            method: Joi.string().valid(['base', 'facebook'])
        }),
        payload: UserSchema.keys({
            socialId: Joi.string(),
            accessToken: Joi.string()
        }).with('socialId', 'accessToken')
    },
    response: {
        schema: {
            token: Joi.string(),
            primary: UserSchema
        }
    }
}