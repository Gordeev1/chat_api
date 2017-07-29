import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { encryption } from '@config';

const { key } = encryption;
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

export const createToken = userId => sign({ userId }, key, { expiresIn: '100 days' });

export const verifyToken = ({ token, userId }) =>
    verify(token, key)
        .then(decoded => {

            if (!decoded) {
                throw new Error('invalid token');
            }

            if (userId && decoded.userId.toString() !== userId.toString()) {
                throw new Error('id does not match token');
            }

            return decoded;
        })