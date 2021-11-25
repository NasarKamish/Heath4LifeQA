
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comm_number').del()
    .then(function () {
      // Inserts seed entries
      return knex('comm_number').insert([
        { 
          id: 1, 
          code_number: 2000
        }
      ]);
    });
};
