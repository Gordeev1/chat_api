import path from 'path';

const { MODE, NODE_ENV, GCM_KEY, MONGO_USER, MONGO_PASSWORD, REDIS_PASSWORD, AUTH_KEY, HOST } = process.env;

const isTestENV = MODE === 'test';
const isProduction = NODE_ENV === 'production';

const host = isProduction ? HOST : 'localhost';
export const APP_NAME = 'Simple Chat';
export const APP_BUNDLE = 'com.gordeev.chat';
export const API_VERSION = process.env.API_VERSION || 1;

export const server = {
    host,
    port: isProduction ? (isTestENV ? 80 : 443) : 8000
};

export const wsServer = {
    host,
    port: 8001,
    labels: 'ws'
};

export const encryption = {
    key: AUTH_KEY || "TEST_KEY"
};

export const mongo = {
    host: '127.0.0.1',
    port: 27017,
    name: 'chat',
    user: MONGO_USER,
    pass: MONGO_PASSWORD
};
export const redis = {
    password: REDIS_PASSWORD
};

export const push = {
    gcm_key: GCM_KEY,
    apn_cert_path: path.resolve(__dirname, isProduction ? '../keys/apn_cert.pem' : '../keys/apn_cert_dev.pem'),
    apn_key_path: path.resolve(__dirname, isProduction ? '../keys/apn_key.pem' : '../keys/apn_key_dev.pem')
};

export const paths = {
    static_dir: path.resolve(__dirname, '../static')
};
