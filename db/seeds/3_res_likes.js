
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('res_likes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('res_likes').insert({res_id: 2, user_id: 1}),
        knex('res_likes').insert({res_id: 3, user_id: 1}),
        knex('res_likes').insert({res_id: 2, user_id: 3}),
        knex('res_likes').insert({res_id: 1, user_id: 2})
      ]);
    });
};
