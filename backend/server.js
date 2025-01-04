import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dontenv from 'dotenv'
import { connectMongoDB } from './config/db.js'

dontenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

app.use('/api/auth', authRoutes);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is ready')
})


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
  connectMongoDB();
})