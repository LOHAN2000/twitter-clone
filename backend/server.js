import express from 'express'
import dontenv from 'dotenv'
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser'
import { connectMongoDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from './routes/notification.routes.js'

dontenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT ?? 5000
const __dirname = path.resolve();


app.use(express.json({ limit: "15mb" }));  
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/notification', notificationRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}


app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
  connectMongoDB();
})