/**
 * redis hash of users socket ids by user _id
 * sockets: { [USER_ID]: USER_SOCKET_ID }
 */
export const SOCKETS = 'SOCKETS';

/**
 * redis hash of users push ids by user _id
 * push: { [USER_ID]: USER_PUSH_ID }
 */
export const PUSH = 'PUSH';

/**
 * redis list of users _id
 */
export const USERS = 'USERS';