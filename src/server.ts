import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
