import bcrypt from 'bcrypt';
import { promisify } from 'util';

const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

export const encrypt = password => hash(password, 10);
export const decrypt = (password, hash) => compare(password, hash);
