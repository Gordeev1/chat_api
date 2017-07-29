import Boom from 'boom';
import Joi from 'joi';
import { omitBy } from 'lodash';
import { Message, User } from '@models';
import * as validators from './user.validators';

export const getChats = {
    description: 'Get user chats',
    tags: ['api', 'me', 'chats'],
    auth: 'jwt',
    ...validators.getChats,
    handler: {
        async async(request, reply) {

            const { userId } = request.auth.credentials;
            const { skip, limit } = request.query;

            const options = omitBy({ lean: true, sort: '-updatedAt', limit, skip }, v => !v);

            try {
                const user = await User
                    .findById(userId)
                    .populate({ path: 'chats', options })
                    .lean()
                    .exec()

                return reply(user.chats);
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
};

export const postChat = {
    description: 'Subscribe chat',
    tags: ['api', 'me', 'chats'],
    auth: 'jwt',
    ...validators.postChat,
    handler: {
        async async(request, reply) {

            const { userId } = request.auth.credentials;
            const { id } = request.params;

            try {
                await User.findByIdAndUpdate(userId, { $push: { chats: id } }).lean().exec();
                return reply({ id });
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
};