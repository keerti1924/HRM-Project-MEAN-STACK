var express = require('express');
const bcrypt = require('bcrypt');
var userModel = require('../models/user');
var router = express.Router();

/* GET users listing. */



// Middleware to check if email already exists
async function checkEmail(req, res, next) {
  try {
    const email = req.body.Email;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        error: "Email Already Exists",
        results: existingUser
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

router.get('/', async function (req, res, next) {
  try {
    var userDetails = new userModel({
      name: 'Ajay',
      email: 'ajay@gmail.com',
      password: 'ajay@123',
    });

    await userDetails.save();
    res.render('index', { title: 'User Data Inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error registering user'
    });
  }
});


// Route to register a new user
router.post('/register', checkEmail, function (req, res, next) {


  bcrypt.hash(req.body.Password, 10, function (err, hash) {
    if (err) {
      res.status(400).json({
        msg: "Something Wrong, Try Later!",
        results: err
      });
    } else {
      var userDetails = new userModel({
        name: req.body.Name,
        email: req.body.Email,
        password: hash,
        role: 'Author'

      });

      userDetails.save().then(resResult => {
        res.status(201).json({
          msg: "You are successfully registered. Now Login!",
          results: resResult
        });
      })
        .catch(err => {
          res.json(err);
        });

    }

  });


});

router.post('/login', async function (req, res, next) {

  var email = req.body.Email;
  userModel.find({ email: email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.status(200).json({
          msg: "Email and Password you have entered is incorrect!",
          UserData: '',
          status: 'error'
        });
      } else {
        bcrypt.compare(req.body.Password, user[0].password, function (err, result) {
          if (err) {
            res.json({
              msg: "Email you have entered is incorrect",
              UserData: '',
              status: 'error'
            });
          }
          if (result) {
            res.status(200).json({
              msg: "User Login Successfully",
              UserData: user,
              status: 'success'
            });
          } else {
            res.json({
              msg: "Password you have entered is incorrect!",
              UserData: '',
              status: 'error'
            });
          }
        });

      }
    })
    .catch(err => {
      res.json({
        error: err
      });
    })


});

module.exports = router;