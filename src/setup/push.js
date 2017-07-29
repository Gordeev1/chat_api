import Push from 'node-pushnotifications';
import { push } from '@config';

const { gcm_key, apn_cert_path, apn_key_path } = push;

export default () =>
    new Push({
        gcm: {
            id: gcm_key,
            phonegap: true
        },
        apn: {
            cert: apn_cert_path,
            key: apn_key_path
        }
    });
