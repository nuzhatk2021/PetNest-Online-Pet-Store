import { Router } from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import cartRoutes from './cartRoute.js';
import orderRoutes from './orderRoute.js';
import petsRoutes from './petRoutes.js';
import orderRecordRoutes from './orderRecordRoute.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.use('/auth',        authRoutes);
router.use('/pets',        petsRoutes);
router.use('/profile',     requireAuth, profileRoutes); // really should be /User
router.use('/cart',        cartRoutes);
router.use('/order',       orderRoutes);
router.use('/orderRecord', orderRecordRoutes);

export default router;