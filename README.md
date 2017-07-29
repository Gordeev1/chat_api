## Installation
```bash
$ git clone https://github.com/Gordeev1/chat_api
$ cd chat_api
$ npm i
$ npm run start-dev
```

Now documentation available at [localhost:8000/documentation](localhost:8000/documentation)

## Preparing for production usage
1. Make sure that these modules installed and available
```bash
NodeJS
MongoDB
Redis
```
2. Prepare your tls certificate
3. Define environment variables
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

4. And start app with
```bash
$ npm start
```

## TODO:
1. Add nginx for serve static files