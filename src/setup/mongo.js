import mongoose from 'mongoose';
import { mongo } from '@config';

const isProduction = process.env.NODE_ENV === 'production';
const { host, name, user, pass } = mongo;

export default ({ prepare }) =>
    mongoose.connect(
        `mongodb://${host}/${name}`,
        Object.assign(
            { promiseLibrary: Promise, useMongoClient: true },
            (isProduction || prepare) && { user, pass }
        )
    );
