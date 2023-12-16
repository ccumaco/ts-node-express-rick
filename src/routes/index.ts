import { Router } from 'express'
const router = Router()
import { getCharacters, getSingleCharacter } from '../controllers/index'

router.post('/characters', getCharacters)
router.get('/get-single-character/:id', getSingleCharacter)

export default router
