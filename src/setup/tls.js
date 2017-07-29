import fs from 'fs';

const { TLS_VERSION, NODE_ENV, TLS_PASSWORD, DOMAIN } = process.env;

const key_path = `/etc/letsencrypt/archive/${DOMAIN}/privkey${TLS_VERSION}.pem`;
const cert_path = `/etc/letsencrypt/archive/${DOMAIN}/fullchain${TLS_VERSION}.pem`;

export default NODE_ENV === 'production' && {
    key: fs.readFileSync(key_path),
    cert: fs.readFileSync(cert_path),
    passphrase: TLS_PASSWORD
};
