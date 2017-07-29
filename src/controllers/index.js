import path from 'path';

export ws from './ws';
export * as auth from './auth/auth';
export * as chats from './chats/chats';
export * as user from './user/user';

export const static_handler = {
    cache: {
        privacy: 'public',
        expiresIn: 1204800000 // ~14 days
    },
    handler: {
        directory: {
            path: path.resolve(__dirname, '../../static'),
            index: true
        }
    }
};
