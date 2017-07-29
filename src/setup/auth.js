import { redis } from '@app';
import { USERS } from '@constants/keys';
import { encryption } from '@config';
const { key } = encryption;

export default [
    [
        'jwt',
        'jwt',
        {
            key,
            validateFunc: async (decoded, request, cb) => {
                const valid = (await redis.lrange(USERS, 0, -1)).includes(decoded.userId);
                return valid ? cb(null, true) : cb(new Error('does not exist'));
            },
            verifyOptions: { algorithms: ['HS256'] }
        }
    ]
];
