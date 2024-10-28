import express from 'express'
import routerContent from './content.js'
import routerUser from './user.js'
import routerTheme from './theme.js'

const api = express()

api.use('/content', routerContent)
api.use('/user', routerUser)
api.use('/theme', routerTheme)

export default api
