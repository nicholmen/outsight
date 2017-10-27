exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice', email:'alice@alice', password:'alice'}),
        knex('users').insert({name: 'Bob', email:'bob@bob', password:'bob'}),
        knex('users').insert({name: 'Maria', email:'maria@maria', password:'maria'}),
        knex('users').insert({name: 'Peter', email:'peter@peter', password:'peter'}),
        knex('users').insert({name: 'Roger', email:'roger@roger', password:'roger'}),
        knex('users').insert({name: 'Charlie', email:'charlie@charlie', password:'charlie'})
      ]);
    });
};
