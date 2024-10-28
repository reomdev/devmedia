import Joi from 'joi'

const validatorCreateTheme = Joi.object({
  theme: Joi.string().required(),
  cover: Joi.string().required(),
  permissions: Joi.object({
    image: Joi.boolean().required(),
    video: Joi.boolean().required(),
    text: Joi.boolean().required()
  })
})

export {
  validatorCreateTheme
}
