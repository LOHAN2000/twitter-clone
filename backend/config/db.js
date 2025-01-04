import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log('Mongo connected: ', conn.connection.host)
  } catch (error) {
    console.log('Error connection to mongoDB: ', error)
    process.exit(1)
  }
}