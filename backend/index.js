import express, { json } from 'express'
import cors from 'cors'
import routerApi from './api/routes/api.js'
import connectDB from './api/db/index.js'

process.loadEnvFile()

connectDB()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(json())

app.use('/api', routerApi)

app.listen(PORT, (err) => {
  if (err) { console.log('Server stoped ', err) } else { console.log(`Server started ${PORT}`) }
})
