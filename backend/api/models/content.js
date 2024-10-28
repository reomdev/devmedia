import mongoose, { Schema } from 'mongoose'

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['VIDEO', 'IMAGE', 'TEXT'], required: true },
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme'
  },
  created_at: { type: Date, default: Date.now() }
})

export default mongoose.model('Content', contentSchema)
