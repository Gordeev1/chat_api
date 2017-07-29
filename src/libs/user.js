import { User } from '@models';
import { grabAndSaveImage } from '@libs/files';
import { redis } from '@app';
import { USERS } from '@constants/keys';

export const createUser = payload => new Promise(async (resolve, reject) => {

    const { avatar, socialId, socia, ...data } = payload;

    let user = Object.assign({}, data);

    try {
        if (avatar) {
            user.avatar = await grabAndSaveImage({ url: avatar, type: 'avatars' })
        }

        if (socialId) {
            user[social] = socialId;
        }

        user = await new User(user).save();
        await redis.lpush(USERS, user._id);

        return resolve(user.toObject());
    } catch (error) {
        return reject(error);
    }
})