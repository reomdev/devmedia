'use strict'

import User from '../models/user.js'

import { createToken } from '../services/token.js'
import { validatorSignup, validatorSignin } from '../validators/user.js'
import { compare } from 'bcrypt'

const signup = async (req, res) => {
  const { body } = req
  const { error } = validatorSignup.validate(body)

  if (error) return res.status(400).send({ error: error.details[0].message })

  if (await User.findOne({ $or: [{ username: body.username }, { email: body.email }] })) { return res.status(400).send({ error: 'This user already exists' }) }

  const user = new User(req.body)

  try {
    await user.save()
    return res.status(200).send({ msg: 'User created successfully', token: createToken(user) })
  } catch (error) {
    return res.status(500).send({ error: `Error to create user ${error}` })
  }
}

const signin = async (req, res) => {
  const { body } = req
  const { error } = validatorSignin.validate(body)

  if (error) return res.status(400).send({ error: error.details[0].message })

  const user = await User.findOne({ username: body.username }, { _id: 0, __v: 0 })
  if (!user) return res.status(404).send({ error: 'User not found' })

  try {
    const validPassword = await compare(body.password, user.password)
    if (!validPassword) return res.status(400).json({ error: 'Password is not valid' })

    return res.status(200).send({ msg: 'Login succesfully', token: createToken(user) })
  } catch (error) {
    return res.status(500).send({ error: `An error has ocurred in signin ${error}` })
  }
}

const listUsers = async (req, res) => {
  const users = await User.find({})
  if (users.length === 0) return res.status(200).send({ msg: "Don't have any users registered" })

  return res.status(200).send({ users })
}

export {
  signup,
  signin,
  listUsers
}
