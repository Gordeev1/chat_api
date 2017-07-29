import corsHeaders from 'hapi-cors-headers';
import chalk from 'chalk';

const isDev = process.env.MODE === 'test';

export default [
    {
        type: 'onPreResponse',
        method: corsHeaders
    },
    isDev && {
        type: 'onRequest',
        method: (request, reply) => {
            console.log(chalk.bgYellow.blue(request.method), chalk.bgRed.white(request.path));
            console.log(chalk.bgBlue.white('headers'), request.headers);
            return reply.continue();
        }
    }
].filter(item => item);
