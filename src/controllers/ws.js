import { redis } from '@app';
import { getRoomKey } from '@utils'
import * as events from '@constants/events';
import * as keys from '@constants/keys';

export default io => {
    io.on('connection', socket => {
        const { userId } = socket.decoded_token;

        redis.hset(keys.SOCKETS, userId, socket.id);

        socket.on('join', payload => {
            const key = getRoomKey(payload);
            socket.join(key);
            socket.to(key).emit(events.CHAT_USER_JOIN, { userId, id: payload.id });
        })

        socket.on('leave', payload => {
            const key = getRoomKey(payload);
            socket.leave(key);
            socket.to(key).emit(events.CHAT_USER_LEAVE, { userId, id: payload.id });
        })

        socket.on('disconnect', () => {
            redis.hdel(keys.SOCKETS, userId);
        });
    });
};
