import { Router } from 'express';
import userBadgeController from '../controllers/UserBadge.controller';
import { authenticate, isAdmin, isOwnerOrAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/leaderboard', userBadgeController.getLeaderboard);

// Routes authentifiées
router.get('/user/:user_id', authenticate, userBadgeController.getUserBadges);
router.get('/user/:user_id/stats', authenticate, userBadgeController.getUserBadgeStats);
router.get('/badge/:badge_id/users', authenticate, userBadgeController.getUsersByBadge);

// Routes Admin uniquement
router.post('/award', authenticate, isAdmin, userBadgeController.awardBadge);
router.post('/auto-award/:user_id', authenticate, isAdmin, userBadgeController.autoAwardBadges);
router.delete('/revoke', authenticate, isAdmin, userBadgeController.revokeBadge);

export default router;