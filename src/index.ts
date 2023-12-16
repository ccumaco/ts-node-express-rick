// src/index.js
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'
dotenv.config()
const app: Express = express()
const port = process.env.PORT || 5000

//config cors
const whitelist = [
  'http://localhost:3000',
  'https://rick-and-morty-73hzqdtl2-ccumaco.vercel.app/',
]
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
}
//config
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors(corsOptions))
//routes
app.use('/api/v1', routes)

//server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
