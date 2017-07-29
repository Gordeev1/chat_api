import { io } from '@app';

export const getOnline = room => new Promise((resolve, reject) =>
    io.of('/').in(room).clients((error, clients) => error ? reject(error) : resolve(clients))
)