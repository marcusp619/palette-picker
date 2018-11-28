exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', table => {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('hex_1');
      table.string('hex_2');
      table.string('hex_3');
      table.string('hex_4');
      table.string('hex_5');
      table.string('hex_6');
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('projects.id');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects'),
  ]);
};
