import { Request, Response } from 'express'
import Users from '../models/Users'
import Classes from '../models/Classes'
import ClassSchedule from '../models/ClassSchedule'

import convertHourToMinutes from '../utils/convertHourToMinutes'
import ClassVideo from '../models/ClassVideo'

interface ScheduleItem{
  week_day: number;
  from: string;
  to: string;
}

interface ClassesFilters{
  time: string;
  subject: string;
  week_day: string;
}

class ClassesController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const filters = request.query as unknown as ClassesFilters

      const timeInMinutes = filters.time ? convertHourToMinutes(filters.time) : ''

      const classes = await Classes.list({
        ...filters,
        time: timeInMinutes
      })

      return response.json({
        message: 'Classes listadas com sucesso',
        data: classes
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  async store (request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule,
        embed
      } = request.body

      // save user
      const insertedUsersId = await Users.save({
        name,
        email,
        avatar,
        whatsapp,
        bio
      })

      // get inserted user_id
      const user_id = insertedUsersId[0]

      // save class from user
      const insertedClassesId = await Classes.save({
        user_id,
        subject,
        cost
      })

      // get inserted user_id
      const class_id = insertedClassesId[0]

      const classScheduleMap = schedule.map((scheduleItem : ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      })

      // save class schedule
      await ClassSchedule.save(classScheduleMap)

      // save class video
      if (embed) {
        await ClassVideo.save({
          class_id,
          embed
        })
      }

      return response.status(201).json({
        message: 'Classe criada com sucesso'
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  async delete (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      await Classes.delete(Number(id))
      return response.status(201).json({
        message: 'Classe removida'
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}

export default new ClassesController()
