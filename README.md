SFR GIT :
https://github.com/sfrenot/web

Execute upon download :
npm install package.json

Install :
npm install mongodb

Add IP to whitelist on :
https://cloud.mongodb.com/v2/65faa5bb2887207a386f1125#/overview

Connect from (node.js) :
mongodb+srv://Admin:<password>@web-db.kspqmse.mongodb.net/?retryWrites=true&w=majority&appName=Web-DB

Connect from (shell) :
mongosh "mongodb+srv://web-db.kspqmse.mongodb.net/" --apiVersion 1 --username Admin

Launch server :
npx nodemon .\backend\server.js