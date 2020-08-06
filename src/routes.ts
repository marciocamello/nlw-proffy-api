import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

routes.get('/', (request, response) => {
  return response.json({
    message: 'Proffy Server API'
  })
})

// Classes controller
routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.store)
routes.delete('/classes/:id', ClassesController.delete)

// ConnectionsController controller
routes.get('/connections', ConnectionsController.index)
routes.post('/connections', ConnectionsController.store)

export default routes
