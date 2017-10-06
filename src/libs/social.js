import fetch from 'isomorphic-fetch';

const checkFacebookToken = ({ socialId, accessToken }) => {
	if (!accessToken || !socialId) {
		throw new Error('access token and id is required');
	}

	return fetch(`https://graph.facebook.com/me?access_token=${accessToken}`)
		.then(response => response.json())
		.then(result => {
			if (!result || result.error) {
				throw new Error('invalid token');
			}

			if (result.id.toString() !== socialId.toString()) {
				throw new Error('id does not match');
			}
			return id;
		});
};

const methodBySocial = {
	facebook: checkFacebookToken
};

export const checkSocialToken = ({ social, ...params }) => {
	if (!social) {
		throw new Error('social name required');
	}

	return methodBySocial[social](params);
};
