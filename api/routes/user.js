// 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const knex = require('../db/knex');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const mailer = require('../config/mailer')

//@route Post api/user
//@desc Auth login user & get token
//@access Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
			const { email, password } = req.body;

			let user = await knex.select().from('users').where('email', email).then((user) => { return user[0] });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials: Email' });
			}
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid Credentials: Password" });
			}

			const payload = {
				user: {
						id: user.id,
				},
			};

			jwt.sign(
				payload,
					config.get("jwtSecret"),
				{
					expiresIn: 600000,
				},
				(err, token) => {
					if (err) throw err;
					res
					.status(200)
					.json({ token });
				}
			);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

// @route       GET api/user
// @desc        Get all users
// @access      Private
router.get('/public', async (req, res) => {
    try {
        let users = await knex.select('fullname').from('users');
        res.send(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

//@route update api/user/forgot-pw/:id 
//@desc password change with nodemailer
//@access Private
router.post('/forgot-pw',[
	check('email', 'Please include a valid email').isEmail() ],
	async (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
			}
			// sending the email to the admin user , whoever is logged in
			try {
				const { 
						email,
				} = req.body; 

				const user = await knex.select().from('users').where('email', email).then((user) => { return user[0]} )
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
						html: `<div> 
											<h3>Hi ${user.fullname},</h3>
											<br>
											<h4>Click link below to reset your password</h4>
											<p><a href="http://h4l-e0335f45-71b6-416d-9152-d82b61c34878.netlify.app/reset-pw/${user.id}">http://h4l-e0335f45-71b6-416d-9152-d82b61c34878.netlify.app/reset-pw/${user.id}</a><p>
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

//@route update api/user/reset-pw/:id 
  //@desc password change 
  //@access Private
  router.put('/reset-pw/:id', [
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }       
        try {
        let { password } = req.body;
        let updateUser = {};
        
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        updateUser.password = password;
        
        knex('users').where('id', req.params.id)
        .update(updateUser).then(function() {
            knex.select()
            .from('users').where('id', req.params.id).then(() => {
                res.json({msg: 'Password Updated'});
            })
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;