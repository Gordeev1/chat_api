import { Server } from 'hapi';
import chalk from 'chalk';

import { server as serverConfig, wsServer as wsConfig } from '@config';
import { tls, plugins, lifecicleHandlers, authStrategies, initMongo, initRedis, initPush, initSocket, watchMemory } from '@setup';
import { ws as wsHandlers } from '@controllers';
import routes from './routes';

const server = new Server();
const https = server.connection({ ...serverConfig, tls });
const ws = server.connection({ ...wsConfig, tls });
const io = initSocket(ws.listener);
const redis = initRedis();
const push = initPush();
initMongo({});
watchMemory();

server.register(plugins, error => {

    if (error) return console.log(error);

    authStrategies.forEach(strategy => server.auth.strategy(...strategy));
    https.ext(lifecicleHandlers);
    https.route(routes);
    wsHandlers(io);

    server.start(err => {
        if (err) return console.log(err);
        console.log(chalk.bgBlue.white(`running`));
        console.log(chalk.bgGreen.black('api'), https.info);
        console.log(chalk.bgGreen.black('ws'), ws.info);
    });
});

process.on('uncaughtException', error => console.log('Uncaught exception', error));
process.on('unhandledRejection', reason => console.error('unhandledRejection', reason));

export { redis, push, io };
export default server;
