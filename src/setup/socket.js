import socket from 'socket.io';
import socketJwt from 'socketio-jwt';
import { encryption } from '@config';

export default listener => {
    const io = socket(listener);
    io.use(socketJwt.authorize({ secret: encryption.key, handshake: true }));
    return io;
};
