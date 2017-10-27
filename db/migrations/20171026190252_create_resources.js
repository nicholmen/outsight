
exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', function (table) {
    table.increments();
    table.string('title');
    table.string('link');
    table.text('description');
    table.integer('creator_id').unsigned();
    table.foreign('creator_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resources');
};
