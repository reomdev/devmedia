'use strict'

import jsonwebtoken from 'jsonwebtoken'
import moment from 'moment'

const { sign, verify } = jsonwebtoken
const { unix } = moment

const createToken = (user) => {
  const payload = {
    sub: user._id,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return sign(payload, process.env.SECRET_KEY)
}

const decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = verify(token, process.env.SECRET_KEY)

      if (payload.exp < unix()) {
        reject({
          status: 401,
          message: 'The token expired'
        })
      }

      resolve(payload)
    } catch (error) {
      reject({
        status: 500,
        message: 'Invalid token',
        error
      })
    }
  })

  return decoded
}

export {
  createToken,
  decodeToken
}
