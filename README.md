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


## Database

List of how the database is made

### Users
---

* Account : "String"    // Unique username used to login 
* Email : "String"      // Needs to be a working email (unecessary now)
* Token : "String"      // Special value generated 
* Project : "String"    // _id of the project in the project table 

### Items
---

* Name : "String"       // Item Name
* Url : "String"        // Item image url

### Projects
---

* Name : "String"       // Project Name
* Owner : "String"      // Project owner
* itemList : Map        // List of the items on it

