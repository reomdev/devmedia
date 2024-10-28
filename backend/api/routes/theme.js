import { Router } from 'express'
import { createTheme, updateTheme, deleteTheme, listThemes } from '../controllers/theme.js'
import { isAuth, ROLE } from '../middlewares/auth.js'

const routerTheme = Router()

routerTheme.post('/create', isAuth(ROLE.ADMIN), createTheme)
routerTheme.get('/list', isAuth(ROLE.ADMIN), listThemes)
routerTheme.put('/update/:id', isAuth(ROLE.ADMIN), updateTheme)
routerTheme.delete('/delete/:id', isAuth(ROLE.ADMIN), deleteTheme)

export default routerTheme
