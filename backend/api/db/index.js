import mongoose from 'mongoose'
import { exit } from 'node:process'

const connectDB = async () => {
  const url = process.env.MONGODB_URI

  try {
    await mongoose.connect(url)

    console.info('Conneciton to database succesfully')
  } catch (error) {
    console.error(`Error connecting to database : ${error}`)
    exit(1)
  }
}

export default connectDB
