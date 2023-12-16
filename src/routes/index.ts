import { Router } from 'express'
const router = Router()
import { getCharacters } from '../controllers/index'

router.post('/characters', getCharacters)

export default router
