const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {

   // Check if the email already exists
   const existingContact = await Contact.findOne({ email: req.body.Email });
   if (existingContact) {
       return res.status(400).json({ message: 'Email already exists' });
   }

    var contact = new Contact({
      name: req.body.Name,
      email: req.body.Email,
      subject: req.body.Subject,
      message: req.body.Message,
    });

    contact.save().then(resResult => {
      res.status(201).json({
        msg: "Thanks for Contacting Us!",
        results: resResult
      });
    })
      .catch(err => {
        res.json(err);
      });

  });

module.exports = router;