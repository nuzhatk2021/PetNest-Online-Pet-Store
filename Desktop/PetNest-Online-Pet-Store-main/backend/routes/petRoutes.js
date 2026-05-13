import { Router } from 'express';
import * as petController from "../controllers/petController.js"
import requireAuth from '../middleware/requireAuth.js';
import isAdmin from '../middleware/requireAuth.js'
const router = Router();

// RESTful pet routes
router.get('/', petController.getAllPets)
router.get('/:id', petController.getPetID)
router.post('/', requireAuth, isAdmin, petController.addPet)
router.put('/:id', requireAuth, isAdmin, petController.updatePet)
router.delete('/:id', requireAuth, isAdmin, petController.deletePet)

export default router
