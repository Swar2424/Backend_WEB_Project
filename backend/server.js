// server.js

// first we import our dependencies…
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const Item = require("./model/item");
const Project = require("./model/project");

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
mongoose.connect("mongodb+srv://Admin:Golmong@web-db.kspqmse.mongodb.net/?retryWrites=true&w=majority&appName=Web-DB");
var db = mongoose.connection;
db.on('error', () => console.error('Erreur de connexion'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/items', (req, res) => {
  const comment = new Comment();
  comment.author = "test";
  comment.text = {cascade : "test2", derp : "test3"};
  comment.save();
  Comment.find()
    .then(comments => {
      res.json({ success: true, data: comments });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.json({ success: true, data: users });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.post('/signup', (req, res) => {
  User.find()
  .then(userbase => {
    const user = new User();
    const { account, email } = req.body;

    if ((!account || !email) && unused) {
      return res.json({
        success: false,
        error: 'You must provide a username and email address'
      });
    }
    let unused = false
    for(let i = 0; i < userbase.length; i++) {
      let obj = userbase[i];
      if (obj.account === account || obj.email === email) {
        return res.json({
          success: false,
          error: 'You must provide an unused username and email address'
        });
      }
    }
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
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));