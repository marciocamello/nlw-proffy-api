import express from 'express'
import ClassesController from './controllers/ClassesController'

const routes = express.Router()

routes.get('/', (request, response) => {
  return response.json({
    message: 'Proffy Server API'
  })
})

// Classes controller
routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.store)

export default routes
