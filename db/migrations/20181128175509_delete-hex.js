exports.up = function(knex, Promise) {
  return knex.schema.table('palettes', table => {
    table.dropColumn('hex_6');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('palettes', table => {
    table.string('hex_6');
  });
};
