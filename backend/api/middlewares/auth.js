import { decodeToken } from '../services/token.js'

const isAuth = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(403).send({ error: 'Don\'t have Authorization header' })
      }

      const token = req.headers.authorization.split(' ')[1]
      const data = await decodeToken(token)

      if (roles.indexOf(data.role) === -1) {
        return res.status(403).send({error : 'User not authorized'})
      }
      req.user = data
      next()
    } catch (error) {
      res.status(500).send({ error })
    }
  }
}

const ROLE = {
  ADMIN: ['ADMIN'],
  READER: ['READER', 'CREATOR', 'ADMIN'],
  CREATOR: ['CREATOR', 'ADMIN']
}

export {
  isAuth,
  ROLE
}
