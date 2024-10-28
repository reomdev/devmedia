import Joi from 'joi'

const validatorSignup = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().valid('ADMIN', 'READER', 'CREATOR').required()
})

const validatorSignin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export {
  validatorSignup,
  validatorSignin
}
