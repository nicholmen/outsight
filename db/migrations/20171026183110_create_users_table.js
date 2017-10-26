
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumns('email','password');
  });
};
