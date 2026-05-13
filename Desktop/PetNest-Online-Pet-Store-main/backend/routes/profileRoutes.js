import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import * as profileController from "../controllers/profileController.js"


const router = Router()

router.get('/user', requireAuth, profileController.getUser)
router.post('/user', requireAuth, profileController.updateUser)

export default router