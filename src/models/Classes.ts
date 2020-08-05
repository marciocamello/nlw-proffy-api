import knex from '../database/connection'
import Model from './Model'

class Classes extends Model {
  async list (filters: any) {
    return knex('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [Number(filters.time)])
          .whereRaw('`class_schedule`.`to` > ??', [Number(filters.time)])
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
  }
}

export default new Classes('classes')
