const { v4 } =  require('uuid');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const creds = require('../../config/db');
const hashPW = bcrypt.hashSync(creds.DEFAULTPW, salt);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          id: v4(),
          fullname: 'Admin',
          email: 'h4lsuperuser@gmail.com',
          role: "admin",
          password: hashPW
        },
        
        {
          id: v4(),
          fullname: 'Leoni',
          email: 'leoni@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        {
          id: v4(),
          fullname: 'Anwar',
          email: 'anwar@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        { 
          id: v4(),
          fullname: 'Denecia',
          email: 'denecia@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        { 
          id: v4(),
          fullname: 'Felecia',
          email: 'felecia@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        { 
          id: v4(),
          fullname: 'Laaiqah',
          email: 'laaiqah@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        { 
          id: v4(),
          fullname: 'Nkosana',
          email: 'nkosana@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        // { 
        //   id: v4(),
        //   fullname: 'Queen',
        //   email: 'queen@lifechoices.co.za',
        //   role: "counsellor",
        //   password: hashPW
        // },
        { 
          id: v4(),
          fullname: 'Sindiswa',
          email: 'sindiswa@lifechoices.co.za',
          role: "counsellor",
          password: hashPW
        },
        // { 
        //   id: v4(),
        //   fullname: 'Ziyanda',
        //   email: 'ziyanda@lifechoices.co.za',
        //   role: "counsellor",
        //   password: hashPW
        // },
      ]).then(() => console.log('User successfully added!'))
      .catch(error => console.log(`Error adding user: ${error}`))
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};