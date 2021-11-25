const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { v4 } = require('uuid');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');

//@route GET api/areas
//@desc getting areas
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let areas = await knex.select().from('areas');
        res.send(areas);
      } else {
        res.status(401);
        return res.send("Access Rejected, Not Authorized");
      }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error")
  }
})

//@route GET api/areas
//@desc getting areas
//@access Public
router.get('/public', async (req, res) => {
  try {
      let areas = await knex.select('area').from('areas');
      res.send(areas);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error")
  }
})

//@route GET api/areas/:id
//@desc getting area by id
//@access Public
router.get('/:id', auth, async (req, res) => {
  try {
      let area = await knex.select('area').from('areas').where('id', req.params.id).then((area) => { return area[0] });
      res.send(area);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error")
  }
})

//@route Post api/areas
//@desc Add new areas
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
        area
      } = req.body;

      let exists = await knex.select().from('areas').where('area', area).then((area) => { return area[0] });
      if (exists) {
        return res.status(400).json({ msg: 'Area exists!' });
      }
      else if (!exists) {
        const newArea = {
          id: v4(),
          area
        }
        knex('areas').insert(newArea)
          .then(function () {
            knex.select()
              .from('areas').then((areas) => {
                res.send(areas)
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


//@route update api/areas/:id
//@desc Update area by id
//@access Private
router.put('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
    if (user.role === 'admin') {
      let {
        area,
        updated_at = new Date(),
      } = req.body;

      const updateArea = {};
      if (area) updateArea.area = area;
      if (updated_at) updateArea.updated_at = updated_at;

      knex('areas').where('id', req.params.id)
        .update(updateArea).then(function () {
          knex.select()
            .from('areas').where('id', req.params.id).then((areas) => {
              res.send(areas[0])
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


//@route DELETE api/areas/:id
//@desc Delete areas
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await knex.select().from('users').then((user) => { return user[0] });
      if (user.role === 'admin') {
        let exists = await knex.select().from('areas').where('id', req.params.id).then((area) => { return area[0] });
        if (!exists) {
          return res.status(400).json({ msg: 'Area not Found!' });
        }
        knex('areas').where('id', req.params.id)
          .del().then(function () {
            res.json({ msg: 'Area Removed!' });
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
