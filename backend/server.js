// server.js

// Dependancies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Schemas
const User = require("./model/user");
const Item = require("./model/item");
const Project = require("./model/project");

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
const mdp = ""
const URI = `mongodb+srv://Admin:${mdp}@web-db.kspqmse.mongodb.net/?retryWrites=true&w=majority&appName=Web-DB`
const dbName = "rotonde"

// Connect to database
mongoose.connect(URI, {dbName:dbName});
var db = mongoose.connection;
db.on('error', () => console.error('Erreur de connexion'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Server is online' });
});

// A DELETE OABDUIBAGOBIUAHZDOHBVAIUSOGILDBOUALGDBUIDAJBUKDZVDKLAGDVUOZVODIA
router.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.json({ success: true, data: users });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.get('/projects', (req, res) => {
  Project.find()
    .then(projects => {
      res.json({ success: true, data: projects });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

// On enregistre un boug, pour la postérité y faudrait faire des .catch
router.post('/signup', (req, res) => {
  User.find() // userbase le résultat de la requête
  .then(userbase => {
    
    const { account, email } = req.body;

    if (!account || !email) {
      return res.json({
        success: false,
        error: 'You must provide a username and email address'
      });
    }

    // Peut être opti avec un find plus précis (en vrai non)
    for(let i = 0; i < userbase.length; i++) {
      let obj = userbase[i];
      if (obj.account === account || obj.email === email) {
        return res.json({
          success: false,
          error: 'You must provide an unused username and email address'
        });
      }
    }

    const user = new User();
    user.account = account;
    user.email = email;
    user.token = "1924";
    user.save();

    return res.json({
      success: true,
      token: "1924"
    });
  })
});

// Opti avec une requête visée
router.post('/login', (req, res) => {
  User.find()
  .then(userbase => {
    const { account, mdp } = req.body;
    if (!account || !mdp) {
      return res.json({
        success: false,
        error: 'You must provide a username and token'
      });
    } else {
      let bool = false
      for(let i = 0; i < userbase.length; i++) {
        let obj = userbase[i];
        if (obj.account === account && obj.token === mdp) {
          bool = true
          return res.json({
            success: true
          });}
      } 
      if (!bool) {
        return res.json({
          success: false,
          error: 'Authentification failed'
        });
      }
    }
  })
});


// Use our router configuration when we call /api
app.use('/db', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));