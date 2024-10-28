'use strict'

import Theme from '../models/theme.js'
import { validatorCreateTheme } from '../validators/theme.js'

const createTheme = async (req, res) => {
  const { body } = req
  const { error } = validatorCreateTheme.validate(body)

  if (error) return res.status(400).send({ error: error.details[0].message })

  if (await findThemeByName(body)) return res.status(400).send({ error: 'This theme are registered' })

  const theme = new Theme(body)

  try {
    await theme.save()
    return res.status(200).send({ msg: 'Created theme successfully' })
  } catch (error) {
    return res.status(500).send({ error: `Error to create theme ${error}` })
  }
}

const updateTheme = async (req, res) => {
  const { id } = req.params
  const { body } = req

  if (Object.keys(body).length === 0) return res.status(400).send({ error: 'The body is empty' })

  try {
    if (!await findThemeById(id)) return res.status(404).send({ error: "This theme aren't registered" })
    const userUpdate = await Theme.findByIdAndUpdate(id, body)

    if (!userUpdate) return res.status(400).send({ error: "Can't update theme" })

    return res.status(200).send({ msg: 'Theme updated successfully' })
  } catch (error) {
    return res.status(500).send({ error: `Error to update theme ${error}` })
  }
}

const deleteTheme = async (req, res) => {
  const { id } = req.params

  try {
    if (!await findThemeById(id)) return res.status(404).send({ error: "This theme aren't registered" })

    await Theme.findByIdAndDelete(id)
    return res.status(200).send({ msg: 'Theme was deleted' })
  } catch (error) {
    return res.status(500).send({ error: `An error has ocurred deleting the theme ${error}` })
  }
}

const listThemes = async (req, res) => {
  const themes = await Theme.find({})
  if (themes.length === 0) return res.status(200).send({ msg: "Don't have any themes registered", themes: [] })

  return res.status(200).send({ themes })
}

const findThemeByName = (body) => {
  return Theme.findOne({ theme: body.theme })
}

const findThemeById = (id) => {
  return Theme.findById(id)
}

export {
  createTheme,
  updateTheme,
  deleteTheme,
  listThemes
}
