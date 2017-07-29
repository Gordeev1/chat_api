import Boom from 'boom';
import { User } from '@models';
import { createToken } from '@libs/jwt';
import { checkSocialToken } from '@libs/social';
import { createUser } from '@libs/user';
import * as validators from './auth.validators';

export const sign = {
    tags: ['api', 'auth'],
    ...validators.sign,
    handler: {
        async async(request, reply) {

            const { method } = request.params;
            const { socialId, social, accessToken } = request.payload;

            try {

                if (method !== 'base') {
                    await checkSocialToken({ accessToken, social, socialId });
                }

                let user = method !== 'base' && await User.findOne({ [social]: socialId }).lean().exec();

                if (!user) {
                    user = await createUser(request.payload);
                }

                const token = await createToken(user._id);

                return reply({ token, primary: user });
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
        }
    }
};