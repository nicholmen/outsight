
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('res_ratings').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('res_ratings').insert({res_id: 2, user_id: 1, rating: 4}),
        knex('res_ratings').insert({res_id: 3, user_id: 2, rating: 5}),
        knex('res_ratings').insert({res_id: 4, user_id: 3, rating: 2})
      ]);
    });
};
