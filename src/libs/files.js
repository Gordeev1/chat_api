import fs from 'fs';
import randomstring from 'randomstring';
import request from 'request';
import sharp from 'sharp';
import { paths } from '@config';

const previewResolutionByType = {
	avatars: [150, 150],
	messages: [200, 200]
};

export const grabAndSaveImage = ({ url, type }) => {
	const random = randomstring.generate();
	const filename = `${random}.png`;

	const req = request.get(url);
	const resolution = previewResolutionByType[type];
	const resizer = sharp()
		.resize(...resolution)
		.min();
	const originWriter = fs.createWriteStream(`${paths.static_dir}/${filename}`);
	const previewWriter = fs.createWriteStream(`${paths.static_dir}/preview_${filename}`);

	const origin = new Promise((resolve, reject) =>
		req
			.pipe(originWriter)
			.on('error', reject)
			.on('close', () => resolve(filename))
	);

	const preview = new Promise((resolve, reject) =>
		req
			.pipe(resizer)
			.pipe(previewWriter)
			.on('error', reject)
			.on('close', () => resolve(filename))
	);

	return Promise.all([origin, preview]).then(result => result[0]);
};
