import mongoose, { Schema } from 'mongoose'

const themeSchema = new Schema({
  theme: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  cover: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    defaultValue: Date.now()
  },
  permissions: {
    image: Boolean,
    video: Boolean,
    text: Boolean
  }
})

export default mongoose.model('Theme', themeSchema)
