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
const mdp = "Golmong1948"
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

// On enregistre un boug, pour la postérité y faudrait faire des .catch
router.post('/users/signup', (req, res) => {
  User.exists({account: req.body.account, token: req.body.mdp })
    .then(users => {
      if (users === null){
        const user = new User();
        user.account = req.body.account;
        user.email = req.body.email;
        user.token = "1924";
        user.save();

        res.json({success: true,token: "1924"});
      } else {
        res.json({ success: false, error: 'You must provide an unused username AND email address'});
      }  
    })
});

// Opti avec une requête visée
router.post('/users/login', (req, res) => {
  User.exists({account: req.body.account, token: req.body.mdp })
    .then(users => {
      if (users === null){
        res.json({ success: false, error: 'Authentification failed' });
      } else {
        res.json({ success: true});
      }  
    })
});


// Items

router.post('/items', (req, res) => {
  Item.find()
    .then(items => {
      res.json({ success: true, data: items });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});


// Projects

router.get('/projects', (req, res) => {
  Project.find()
    .then(projects => {
      res.json({ success: true, data: projects });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.post('/projects/getProject', (req, res) => {
  Project.findByID(req.body.id)
    .then(project => {
      res.json({ success: true, data: project });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.post('/projects/getAll', (req, res) => {

  Project.find({owner : req.body.user}, "-owner -itemList")
    .then(user_projects => {
      res.json({ success: true, data: user_projects });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});



// Use our router configuration when we call /api
app.use('/db', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));