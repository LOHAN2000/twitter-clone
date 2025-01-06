import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dontenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectMongoDB } from './config/db.js'

dontenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
  connectMongoDB();
})