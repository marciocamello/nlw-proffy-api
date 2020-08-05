import { Request, Response } from 'express'
import Connections from '../models/Connections'

class ConnectionsController {
  async index (request: Request, response: Response): Promise<Response> {
    const { total } = await Connections.total()
    try {
      return response.json({
        message: 'Classes listadas com sucesso',
        total
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  async store (request: Request, response: Response): Promise<Response> {
    try {
      const {
        user_id
      } = request.body

      await Connections.save({ user_id })

      return response.status(201).json({
        message: 'Connection criada com sucesso'
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}

export default new ConnectionsController()
