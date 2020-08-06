import knex from '../database/connection'
import Model from './Model'

class Classes extends Model {
  async list (filters: any) {
    const query = knex('classes')

    query.whereExists(function () {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')

      if (filters.week_day) {
        this.whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
      }

      if (filters.time) {
        this.whereRaw('`class_schedule`.`from` <= ??', [Number(filters.time)])
          .whereRaw('`class_schedule`.`to` > ??', [Number(filters.time)])
      }
    })

    if (filters.subject) {
      query.where('classes.subject', 'like', `%${filters.subject}%`)
    }

    query.join('users', 'classes.user_id', '=', 'users.id')
      .leftJoin('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
      .leftJoin('class_video', 'classes.id', '=', 'class_video.class_id')
      .groupBy('classes.id')
      .select(['classes.*', 'users.*', 'class_video.*', 'class_schedule.*'])

    return query
  }
}

export default new Classes('classes')
