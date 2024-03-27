// server.js

// first we import our dependencies…
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Comment = require("./model/comment");

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

router.get('/comments', (req, res) => {
  Comment.find()
    .then(comments => {
      res.json({ success: true, data: comments });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

router.post('/signup', (req, res) => {
  Comment.find()
  .then(comments => {
    const comment = new Comment();
    const { account, email } = req.body;

    if ((!account || !email) && unused) {
      return res.json({
        success: false,
        error: 'You must provide a username and email address'
      });
    }
    let unused = false
    for(let i = 0; i < comments.length; i++) {
      let obj = comments[i];
      if (obj.account === account || obj.email === email) {
        return res.json({
          success: false,
          error: 'You must provide an unused username and email address'
        });
      }
    }
    comment.account = account;
    comment.email = email;
    comment.token = "1924";
    comment.save();
    return res.json({
      success: true,
      token: "1924"
    });
  })
});

router.post('/login', (req, res) => {
  Comment.find()
  .then(comments => {
    const { account, mdp } = req.body;
    if (!account || !mdp) {
      return res.json({
        success: false,
        error: 'You must provide a username and token'
      });
    } else {
      let bool = false
      for(let i = 0; i < comments.length; i++) {
      let obj = comments[i];
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