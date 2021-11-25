const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { v4 } = require('uuid');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');

//@route GET api/sites
//@desc getting sites
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let sites = await knex.select().from('sites');
        res.send(sites);
      } else {
        res.status(401);
        return res.send("Access Rejected, Not Authorized");
      }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");   
  }
})

//@route GET api/sites/community-number
//@desc getting community code number
//@access Public
router.get('/community-number', async (req, res) => {
  try {
    let last = await knex.select().from('comm_number')
    res.send(last[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");   
  }
})

//@route POST api/sites/community-number
//@desc posting community code number
//@access Public
router.post('/community-number', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let {
          code_number
        } = req.body;

        let codeNumber = {
          code_number
        }

        knex('comm_number').insert(codeNumber)
          .then(function () {
            knex.select().from('comm_number').then((code) => {
              res.send(code[0])
            })
          })
   } else {
      res.status(401);
      return res.send("Access Rejected, Not Authorized");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");   
  }
})

//@route PUT api/sites/community-number/:id
//@desc Updating community code number
//@access Public
router.put('/community-number/:id', async (req, res) => {
  try {
    let {
      code_number
    } = req.body;

    let updateCode = {};
    if (code_number) updateCode.code_number = code_number;

    knex('comm_number').where('id', req.params.id)
      .update(updateCode).then(function() {
        knex.select().from('comm_number').where('id', req.params.id).then((code) => {
          res.send(code[0]);
        })
      })
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");   
  }
})

//@route DELETE api/sites/community-number/:id
//@desc Deleting community code number
//@access Public
router.delete('/community-number/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        knex('comm_number').where('id', req.params.id)
          .del().then(function () {
            res.json({ msg: "Site Removed!" });
          })
      }  else {
        res.status(401);
        return res.send("Access Rejected, Not Authorized");
      }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


//@route GET api/sites
//@desc getting sites
//@access Public
router.get('/public', async (req, res) => {
  try {
    let sites = await knex.select().from('sites');
    res.send(sites);
  } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
  }
})

//@route GET api/sites/:id
//@desc getting site by id
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let site = await knex.select().from('sites').where('id', req.params.id).then((site) => { return site[0] });
        res.send(site);
      } else {
        res.status(401);
        return res.send("Access Rejected, Not Authorized");
      }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");   
  }
})

//@route Post api/sites
//@desc Add new sites
//@access Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      const {
        type,
        site_name,
        site_code,
        code_number,
        district
      } = req.body;

      let exists = await knex.select().from('sites').where('site_name', site_name).then((site) => { return site[0] });
      
      if (exists) {
        return res.status(400).json({ msg: "site exists!" });
      }
      else if (!exists) {
        const newSite = {
          id: v4(),
          type,
          site_name,
          site_code,
          code_number,
          district
        }
        knex('sites').insert(newSite)
          .then(function () {
            knex.select()
              .from('sites').then((sites) => {
                res.send(sites)
              });
          })
      } else {
        res.status(401);
        return res.send("Access Rejected, Not Authorized");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


//@route update api/sites/:id
//@desc Update site by id
//@access Private
router.put('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      let {
        type,
        site_name,
        site_code,
        code_number,
        district,
        updated_at = new Date(),
      } = req.body;

      const updateSite = {};
      if (type) updateSite.type = type;
      if (site_name) updateSite.site_name = site_name;
      if (site_code) updateSite.site_code = site_code;
      if (code_number) updateSite.code_number = code_number;
      if (district) updateSite.district = district;
      if (updated_at) updateSite.updated_at = updated_at;

      knex('sites').where('id', req.params.id)
        .update(updateSite).then(function () {
          knex.select()
            .from('sites').where('id', req.params.id).then((sites) => {
              res.send(sites[0])
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

//@route update api/sites/:id
//@desc Update site by id
//@access Public
router.put('/public/:id', async (req, res) => {
  try {
    let {
      code_number,
      updated_at = new Date(),
    } = req.body;

    const updateSite = {};
    if (code_number) updateSite.code_number = code_number;
    if (updated_at) updateSite.updated_at = updated_at;

    knex('sites').where('id', req.params.id)
      .update(updateSite).then(function () {
        knex.select()
          .from('sites').where('id', req.params.id).then((sites) => {
            res.send(sites[0])
          })
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/sites/:id
//@desc Delete sites
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let exists = await knex.select().from('sites').where('id', req.params.id).then((site) => { return site[0] });
        if (!exists) {
          return res.status(400).json({ msg: "Site not Found!" });
        }
        knex('sites').where('id', req.params.id)
          .del().then(function () {
            res.json({ msg: "Site Removed!" });
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

module.exports = router;
