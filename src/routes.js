import { API_VERSION } from '@config';
import { auth, chats, user, static_handler } from '@controllers';

const fullpath = (endpoint, version) => `/api/v${version || API_VERSION}/${endpoint}`;

export default [
    { method: 'GET', path: '/static/{params*}', config: static_handler },

    { method: 'POST', path: fullpath('auth/{method}'), config: auth.sign },

    { method: 'GET', path: fullpath('me/chats'), config: user.getChats },
    { method: 'POST', path: fullpath('me/chats/{id}'), config: user.postChat },

    { method: 'GET', path: fullpath('chats'), config: chats.get },
    { method: 'GET', path: fullpath('chats/{id}'), config: chats.getById },
    { method: 'POST', path: fullpath('chats'), config: chats.post },
    { method: 'GET', path: fullpath('chats/{id}/members'), config: chats.getMembers },

    { method: 'GET', path: fullpath('chats/{id}/messages'), config: chats.getMessages },
    { method: 'POST', path: fullpath('chats/{id}/messages'), config: chats.postMessage }
];
