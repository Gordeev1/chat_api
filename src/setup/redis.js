import Redis from 'ioredis';
import { redis } from '@config';
const { password } = redis;

export default () => new Redis({ password });
