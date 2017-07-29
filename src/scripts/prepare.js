import { init_mongo } from '@setup';

init_mongo({ prepare: true })
    .then(success => {
        // some code for prepare your app
    })
    .catch(error => console.log(error));
