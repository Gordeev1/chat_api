import memwatch from 'memwatch-next';
export default () => memwatch.on('leak', info => console.log('leak', info));
