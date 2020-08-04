import knex from '../database/connection'

class Model {
  public table: string | undefined

  constructor (table:string) {
    this.table = table
  }

  async index () {
    return await knex(this.table)
  }

  async show (id: any) {
    return await knex(this.table)
      .where('id', id)
      .first()
  }

  async save (data: object) {
    const trx = await knex.transaction()

    const result = await trx(this.table)
      .insert(data)

    await trx.commit()

    return result
  }

  async update (id: number, data: object) {
    const trx = await knex.transaction()

    const result = await trx(this.table)
      .where('id', id)
      .update(data)

    await trx.commit()

    return result
  }

  async delete (id: number) {
    const trx = await knex.transaction()

    const result = await trx(this.table)
      .where('id', id)
      .del()

    await trx.commit()

    return result
  }
}

export default Model
