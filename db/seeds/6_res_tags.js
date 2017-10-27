
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('res_tags').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('res_tags').insert({res_id: 2, user_id: 1, tag_name: 'food'}),
        knex('res_tags').insert({res_id: 3, user_id: 1, tag_name: 'art'}),
        knex('res_tags').insert({res_id: 4, user_id: 1, tag_name: 'cities'}),
        knex('res_tags').insert({res_id: 1, user_id: 2, tag_name: 'pet'}),
        knex('res_tags').insert({res_id: 2, user_id: 3, tag_name: 'car'}),
        knex('res_tags').insert({res_id: 3, user_id: 4, tag_name: 'sports'}),
        knex('res_tags').insert({res_id: 2, user_id: 3, tag_name: 'weather'}),
        knex('res_tags').insert({res_id: 3, user_id: 2, tag_name: 'parks'}),
        knex('res_tags').insert({res_id: 4, user_id: 1, tag_name: 'travel'})
      ]);
    });
};
