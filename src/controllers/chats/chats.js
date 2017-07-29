import Boom from 'boom';
import { omitBy } from 'lodash';
import { promisify } from 'util';
import { Chat, Message, User } from '@models';
import { io, redis } from '@app';
import * as validators from './chats.validators';
import * as keys from '@constants/keys';
import * as socketEvent from '@constants/events';
import { getRoomKey } from '@utils';
import { getOnline } from '@libs/socket';

export const get = {
    description: 'Get public chats',
    tags: ['api', 'chats'],
    ...validators.get,
    handler: {
        async async(request, reply) {

            const { skip, limit } = request.query;
            const options = omitBy({ sort: '-updatedAt', skip, limit }, v => !v)

            try {
                const result = await Chat.find({ type: 'public' }, '-messages', options).lean().exec();
                return reply(result);
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
};

export const getById = {
    description: 'Get chat by id',
    tags: ['api', 'chats'],
    ...validators.getById,
    handler: {
        async async(request, reply) {

            const { id } = request.params;
            const roomKey = getRoomKey({ type: 'chat', id });

            try {

                const [chat, members, onlineSockets] = await Promise.all([
                    Chat.findById(id, '-messages').lean().exec(),
                    User.find({ chats: id }, 'avatar name').lean().exec(),
                    getOnline(roomKey)
                ])

                const sockets = await Promise.all(
                    members.map(user => redis.hget(keys.SOCKETS, user._id))
                );

                const online = members.filter((_, i) => {
                    const socket = sockets[i];
                    return onlineSockets.includes(socket);
                })

                const result = { ...chat, online, members };

                return reply(result);

            } catch (error) {
                console.log(error);
                return reply(Boom.badImplementation(error));
            }
        }
    }
}

export const post = {
    tags: ['api', 'chats'],
    auth: 'jwt',
    ...validators.post,
    handler: {
        async async(request, reply) {

            const { userId } = request.auth.credentials;

            try {
                const chat = (await new Chat({
                    ...request.payload,
                    type: 'public',
                    creator: userId
                }).save()).toObject();

                await User.findByIdAndUpdate(userId, { $push: { chats: chat._id } }).lean().exec();

                return reply(chat);
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
};

export const getMessages = {
    tags: ['api', 'chats'],
    auth: 'jwt',
    ...validators.getMessages,
    handler: (request, reply) => {
        const { auth, query, params } = request;

        const { userId } = auth.credentials;
        const { id } = params;

        const options = omitBy({ lean: true, sort: '-createdAt', ...query }, v => !v);

        return Chat
            .findById(id)
            .populate({
                path: 'messages',
                options,
                populate: {
                    path: 'author',
                    select: 'name avatar',
                    options: { lean: true }
                }
            })
            .lean()
            .exec((error, chat) =>
                reply(error ? Boom.badImplementation(error) : chat.messages)
            );
    }
};

export const postMessage = {
    tags: ['api', 'chats'],
    auth: 'jwt',
    ...validators.postMessage,
    handler: {
        async async(request, reply) {

            const { id } = request.params;
            const { userId } = request.auth.credentials;

            try {
                const message = (await new Message({ ...request.payload, author: userId })
                    .save()
                    .then(message =>
                        message
                            .populate({ path: 'author', select: 'name avatar' })
                            .execPopulate()
                    ))
                    .toObject()

                await Chat
                    .findByIdAndUpdate(id, { $push: { messages: message._id } }, { projection: '' })
                    .lean()
                    .exec();

                const roomKey = getRoomKey({ type: 'chat', id });
                io.of('/').in(roomKey).emit(socketEvent.CHAT_NEW_MESSAGE, { id, item: message });

                return reply(message);
            } catch (error) {
                console.log(error);
                return reply(Boom.badImplementation(error));
            }
        }
    }
};

export const getMembers = {
    tags: ['api', 'chats'],
    auth: 'jwt',
    ...validators.getMembers,
    handler: {
        async async(request, reply) {

            const { id } = request.params;

            try {
                let result = await User.find({ chats: id }, 'avatar name').lean().exec();
                return reply(result);
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
}