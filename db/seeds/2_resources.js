
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({title: 'Title1', link: 'Link1', description: 'description1', creator_id: '1'}),
        knex('resources').insert({title: 'Title2', link: 'Link2', description: 'description2', creator_id: '2'}),
        knex('resources').insert({title: 'Title3', link: 'Link3', description: 'description3', creator_id: '3'}),
        knex('resources').insert({title: 'Title4', link: 'Link4', description: 'description4', creator_id: '1'}),
        knex('resources').insert({title: 'Title5', link: 'Link5', description: 'description5', creator_id: '2'}),
        knex('resources').insert({title: 'Title6', link: 'Link6', description: 'description6', creator_id: '3'}),
        knex('resources').insert({title: 'Title7', link: 'Link7', description: 'description7', creator_id: '4'})
      ]);
    });
};
