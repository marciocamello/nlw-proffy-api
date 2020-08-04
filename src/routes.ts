import express from 'express'

const routes = express.Router()

routes.get('/', (request, response) => {
  return response.json({
    message: 'Proffy Server API'
  })
})

export default routes
