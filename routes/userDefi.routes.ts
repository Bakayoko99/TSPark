import { Router } from 'express';
import userDefiController from '../controllers/UserDefi.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/challenge/:challenge_id/participants', userDefiController.getDefiParticipants);
router.get('/challenge/:challenge_id/count', userDefiController.countParticipants);
router.get('/challenge/:challenge_id/leaderboard', userDefiController.getLeaderboard);
router.get('/challenge/:challenge_id/stats', userDefiController.getDefiStats);
router.get('/user/:user_id/challenge/:challenge_id', userDefiController.getParticipation);

// Routes protégées - Utilisateur authentifié
router.post('/join', authenticate, userDefiController.joinDefi);
router.post('/accept', authenticate, userDefiController.acceptInvitation);
router.post('/start', authenticate, userDefiController.startDefi);
router.post('/abandon', authenticate, userDefiController.abandonDefi);
router.put('/progress/:challenge_id', authenticate, userDefiController.updateProgress);
router.delete('/leave/:challenge_id', authenticate, userDefiController.leaveDefi);
router.get('/my/challenges', authenticate, userDefiController.getMyDefis);
router.get('/my/challenges/status/:status', authenticate, userDefiController.getMyDefisByStatus);
router.get('/my/stats', authenticate, userDefiController.getUserStats);

// Routes protégées - Créateur du défi (invitations)
router.post('/invite', authenticate, userDefiController.inviteUser);
router.post('/invite/bulk', authenticate, userDefiController.inviteMultipleUsers);

export default router;