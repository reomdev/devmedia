'use strict'

import { Router } from 'express'
import { createContent, updateContent, deleteContent, listContent } from '../controllers/content.js'
import { isAuth, ROLE } from '../middlewares/auth.js'
import upload from '../middlewares/file.js'

const routerContent = Router()

routerContent.post('/create', isAuth(ROLE.CREATOR), upload.single('file'), createContent)
routerContent.get('/list', isAuth(ROLE.READER), listContent)
routerContent.put('/update/:id', isAuth(ROLE.CREATOR), upload.single('file'), updateContent)
routerContent.delete('/delete/:id', isAuth(ROLE.CREATOR), deleteContent)

export default routerContent
