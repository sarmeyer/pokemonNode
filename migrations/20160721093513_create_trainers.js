exports.up = function(knex, Promise) {
  return knex.schema.createTable('trainers', function(table){
    table.increments();
    table.string('name');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trainers');
};
