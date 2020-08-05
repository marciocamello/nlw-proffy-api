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

  async findOne (where) {
    return await knex(this.table)
      .where(where)
      .first()
  }

  async save (data: object) {
    const trx = await knex.transaction()
    try {
      const result = await trx(this.table)
        .insert(data)

      await trx.commit()

      return result
    } catch (error) {
      trx.rollback()
    }
  }

  async update (id: number, data: object) {
    const trx = await knex.transaction()
    try {
      const result = await trx(this.table)
        .where('id', id)
        .update(data)

      await trx.commit()

      return result
    } catch (error) {
      trx.rollback()
    }
  }

  async delete (id: number) {
    const trx = await knex.transaction()
    try {
      const result = await trx(this.table)
        .where('id', id)
        .del()

      await trx.commit()

      return result
    } catch (error) {
      trx.rollback()
    }
  }
}

export default Model
