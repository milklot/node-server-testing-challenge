
exports.up = async function(knex) {
  await knex.schema.createTable('animals', (table) => {
		table.increments('id');
		table.text('name').notNullable().unique();
		table.text('species').notNullable();
		table.integer('age').notNullable();
  })
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('animals');
};
