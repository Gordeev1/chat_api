## Requirements
```bash
NodeJS, current LTS or higher
MongoDB
Redis
``` 

## Installation
```bash
$ git clone https://github.com/Gordeev1/chat_api
$ cd chat_api
$ npm i
$ npm i -g nodemon
$ npm run start-dev
```

Now documentation available at [localhost:8000/documentation](http://localhost:8000/documentation)

## Preparing for production usage
1. Prepare your tls certificate
2. Define environment variables
```javascript
// pm2.config
"env": {
    "TLS_PASSWORD": "",
    "GCM_KEY": "",
    "MONGO_USER": "",
    "MONGO_PASSWORD": "",
    "REDIS_PASSWORD": "",
    "AUTH_KEY": "",
    "HOST": "",
    "DOMAIN": ""
}
```

3. And start app with
```bash
$ npm start
```

## TODO:
1. Add nginx for serve static files