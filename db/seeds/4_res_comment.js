
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('res_comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('res_comments').insert({res_id: 1, user_id: 3, comment: 'this is a comment 1'}),
        knex('res_comments').insert({res_id: 1, user_id: 4, comment: 'this is a comment 2'}),
        knex('res_comments').insert({res_id: 1, user_id: 2, comment: 'this is a comment 3'}),
        knex('res_comments').insert({res_id: 2, user_id: 1, comment: 'this is a comment 4'}),
        knex('res_comments').insert({res_id: 2, user_id: 4, comment: 'this is a comment 5'}),
        knex('res_comments').insert({res_id: 3, user_id: 4, comment: 'this is a comment 6'})
      ]);
    });
};
