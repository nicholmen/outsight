
exports.up = function(knex, Promise) {
  return knex.schema.createTable('res_comments', function (table) {
    table.increments();
    table.text('comment');
    table.integer('res_id').unsigned();
    table.integer('user_id').unsigned();
    table.foreign('res_id').references('id').inTable('resources');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('res_comments');
};
