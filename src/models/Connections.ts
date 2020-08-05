import db from '../database/connection'
import Model from './Model'

class Connections extends Model {
  async total () {
    const [total] = await db('connections').count('* as total')
    return total
  }
}

export default new Connections('connections')
