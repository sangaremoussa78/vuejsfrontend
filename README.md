# online-shop-frontend

## Build Setup

```bash
# install dependencies
$ npm install

# nuxt.config.js
1- update the <project directory>/nuxt.config.js
```
axios: {
    baseURL: ''   // lumen project base url
  }
  
  env: {
      PAYPAL_CLIENT_ID: ""   // paypal client id
    }
```
2- update the <project directory>/admin/nuxt.config.js
```
axios: {
    baseURL: ''    // lumen project base url
  }
  
  env: {
      PUSHER_APP_KEY: ""   // pusher app key
    }
```

## serve with hot reload at localhost:3000 for website and localhost:4000 for admin
$ npm run dev

## build for production and launch server
$ npm run build
