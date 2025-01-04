import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dontenv from 'dotenv'

dontenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})