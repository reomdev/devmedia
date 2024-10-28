import { Router } from 'express'
import { signup, signin, listUsers } from '../controllers/user.js'
import { isAuth, ROLE } from '../middlewares/auth.js'

const routerUsers = Router()

routerUsers.post('/signup', signup)
routerUsers.post('/signin', signin)
routerUsers.get('/list', isAuth(ROLE.ADMIN), listUsers)

export default routerUsers
