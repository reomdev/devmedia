'use strict'

import mongoose, { Schema } from 'mongoose'
import { hash } from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'READER', 'CREATOR'],
    uppercase: true,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

userSchema.pre('save', async function (next) {
  const hashedPassword = await hash(this.password, 10)
  this.password = hashedPassword

  next()
})

export default mongoose.model('User', userSchema)
