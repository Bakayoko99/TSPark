import { Router } from 'express';
import defiController from '../controllers/Defi.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { verifyDefiOwnership } from '../middlewares/gymOwnership.middleware';

const router = Router();

// Routes publiques (consultation)
router.get('/search', defiController.search);
router.get('/active', defiController.getActive);
router.get('/collaborative', defiController.getCollaborative);
router.get('/status/:status', defiController.getByStatus);
router.get('/difficulty/:difficulty', defiController.getByDifficulty);
router.get('/creator/:creator_id', defiController.getByCreatorId);
router.get('/gym/:gym_id', defiController.getByGymId);
router.get('/stats', defiController.getStats);
router.get('/:id', defiController.getById);
router.get('/', defiController.getAll);

// Routes protégées - Utilisateur authentifié
router.get('/my/challenges', authenticate, defiController.getMyDefis); // Nouvelle route
router.post('/', authenticate, defiController.create);

// Routes protégées - Créateur du défi ou ADMIN
router.put('/:id', authenticate, verifyDefiOwnership, defiController.update);
router.patch('/:id/status', authenticate, verifyDefiOwnership, defiController.updateStatus);
router.delete('/:id', authenticate, verifyDefiOwnership, defiController.delete);

export default router;