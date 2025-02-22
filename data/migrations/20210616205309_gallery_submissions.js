exports.up = function (knex) {
  return knex.schema.createTable('Gallery_Submissions', (table) => {
    table.increments('children_submissions_id');
    table.timestamps(true, true);
    table.integer('sprint').notNullable();
    table
      .integer('children_id')
      .unsigned()
      .references('ID')
      .inTable('Children')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('submission_id')
      .unsigned()
      .references('ID')
      .inTable('Submissions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Gallery_Submissions');
};
