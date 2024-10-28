import Joi from 'joi'

const validatorCreateContent = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string().valid('VIDEO', 'IMAGE', 'TEXT').required(),
  url: Joi.string(),
  user: Joi.string().hex().length(24).required(), // Validates ObjectId format
  theme: Joi.string().hex().length(24).required(), // Validates ObjectId format
  created_at: Joi.date()
})

export {
  validatorCreateContent
}
