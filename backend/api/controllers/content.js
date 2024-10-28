'use strict'

import Content from '../models/content.js'
import { validatorCreateContent } from '../validators/content.js'

const createContent = async (req, res) => {
  const { body } = req
  const { error } = validatorCreateContent.validate(body)

  if (error) return res.status(400).send({ error: error.details[0].message })

  const content = new Content(body)

  try {
    await content.save()
    return res.status(200).send({ msg: 'Created content successfully' })
  } catch (error) {
    return res.status(500).send({ error: `Error to create content ${error}` })
  }
}

const updateContent = async (req, res) => {
  const { id } = req.params
  const { body } = req

  if (Object.keys(body).length === 0) return res.status(400).send({ error: 'The body is empty' })

  try {
    if (!await findContentById(id)) return res.status(404).send({ error: "This content aren't registered" })
    const contentUpdate = await Content.findByIdAndUpdate(id, body)

    if (!contentUpdate) return res.status(400).send({ error: "Can't update content" })

    return res.status(200).send({ msg: 'Content updated successfully' })
  } catch (error) {
    return res.status(500).send({ error: `Error to update content ${error}` })
  }
}

const deleteContent = async (req, res) => {
  const { id } = req.params

  try {
    if (!await findContentById(id)) return res.status(404).send({ error: "This content aren't registered" })

    await Content.findByIdAndDelete(id)
    return res.status(200).send({ msg: 'Content was deleted' })
  } catch (error) {
    return res.status(500).send({ error: `An error has ocurred deleting the content ${error}` })
  }
}

const listContent = async (req, res) => {
  const content = await Content.find({})
  if (content.length === 0) return res.status(200).send({ msg: "Don't have any content registered", content: [] })

  return res.status(200).send({ content })
}

const findContentById = (id) => {
  return Content.findById(id)
}

export {
  createContent,
  updateContent,
  deleteContent,
  listContent
}
