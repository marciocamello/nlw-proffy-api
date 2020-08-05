import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('class_video', table => {
    table.increments('id').primary()

    table.integer('embed').notNullable()

    table.integer('class_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('class_video')
}
