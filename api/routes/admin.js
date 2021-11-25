const express = require('express');
const router = express.Router();
const { v4 } =  require('uuid');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const knex = require('../db/knex');
const nodemailer = require('nodemailer');
const mailer = require('../config/mailer')
const { check, validationResult } = require('express-validator');

// @route       GET api/user
// @desc        Get all users
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      let users = await knex.select().from('users');
      res.send(users);
    } else {
      res.status(401);
      return res.send("Access Rejected, Not Authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/user/:id
// @desc        Get user by id
// @access      Private
router.get('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      let person = await knex.select().from('users').where('id', req.params.id).then((user) => { return user[0] });
      res.send(person);
    } else {
      res.status(401);
      return res.send("Access Rejected, Not Authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Post api/user
//@desc Add new user
//@access Private
router.post('/', [auth, [
  check('fullname', 'Please Enter a valid name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please password with 6 or more characters').isLength({ min: 6 })
]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // let user = await knex.select().from('users').then((user) => { return user[0] });
      // if (user.role === 'admin') {
        const {
          fullname,
          email,
          password,
          role
        } = req.body;

        let exists = await knex.select().from('users').where('email', email).then((user) => { return user[0] });
        if (exists) {
          return res.status(400).json({ msg: 'User already registered' });
        }
        else if(!exists){
          const user = {
            id: v4(),
            fullname,
            email,
            password,
            role
          }

          const salt = await bcrypt.genSalt(10);
    
          user.password = await bcrypt.hash(password, salt);
    
          knex('users').insert(user)
            .then(function () {
                res.json({ msg: "User Added!" })
            })
        }
      // } else {
      //   res.status(401);
      //   return res.send("Access Rejected, Not Authorized");
      // }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })

// @route       UPDATE api/users
// @desc        uPDATE USER
// @access      Private
router.put('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      let {
        fullname,
        email,
        password,
        role,
        updated_at = new Date()
      } = req.body;

      const updateUser = {};
      if (fullname) updateUser.fullname = fullname;
      if (email) updateUser.email = email;
      if (password) {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        updateUser.password = password;
      }
      if (role) updateUser.role = role;
      if (updated_at) updateUser.updated_at = updated_at;

      knex('users').where('id', req.params.id)
        .update(updateUser).then(function () {
          knex.select()
            .from('users').where('id', req.params.id).then((users) => {
              res.send(users[0])
            })
        })
    } else {
      res.status(401);
      return res.send("Access Rejected, Not Authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/admin/:id
//@desc Delete users
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let exists = await knex.select().from('users').where('id', req.params.id).then((user) => { return user[0] });
        if (!exists) {
          return res.status(400).json({ msg: 'User not Found!' });
        }
        knex('users').where('id', req.params.id)
          .del().then(function () {
            res.json({ msg: 'User Removed!' });
          })
        } else {
          res.status(401);
          return res.send("Access Rejected, Not Authorized");
        }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

//@route update api/user/reset-pw/:id 
//@desc password change with nodemailer
//@access Private
router.post('/pw/:id',[ auth, 
  [ check('email', 'Please include a valid email').isEmail()]],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      // sending the email to the admin user , whoever is logged in
      try {
          const { 
              email,
              password = req.params.id
          } = req.body; 
          // info of the user where the email is sent from
          const transporter = nodemailer.createTransport({
              host: mailer.HOST,
              port: mailer.PORT,
              auth: {
                user: mailer.USER,
                pass: mailer.PASS,
              },
          });
          //   Email format that gets sent to the companies admin
          var mailData = {
              from: mailer.USER,
              to: email,
              subject: 'Password Reset',
              // text: 'This is a test field to test if nodemailer works and is functional',
              // date: new Date('2020-11-23 00:00:00'),
              html:  `<div> 
                        <h3>Hi ${fullname},</h3>
                        <br>
                        <h4>Click link below to reset your password</h4>
                        <p><a href="h4l-e0335f45-71b6-416d-9152-d82b61c34878.netlify.app/reset-pw/${user.id}">h4l-e0335f45-71b6-416d-9152-d82b61c34878.netlify.app/reset-pw/${user.id}</a><p>
                        <br>
                        <p>For any queries feel free to contact us...</p>
                        <div>
                            Email: ${mailer.USER}
                            <br>
                            Tel: 021 696 4157
                        <div>
                    </div>`
          };
  
          await transporter.verify((error, success) => {
              if (error) {
                console.log(error);
              }
            });
          
          await transporter.sendMail(mailData, function(error, info){
              if(error){
                  console.log(error);
              } else{
                  console.log('Email sent: ' + info.response);
              }
          });
          res.json({ msg: 'Link Sent'} )
          // confirmation that the email got sent
      } catch (error) {
          console.error(err.message);
          res.status(500).send("Server Error");
      }
  })




  
module.exports = router;
