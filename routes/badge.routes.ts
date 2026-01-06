import { Router } from 'express';
import badgeController from '../controllers/Badge.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques (lecture seule)
router.get('/', badgeController.getAll);
router.get('/search', badgeController.search);
router.get('/stats', badgeController.getStats);
router.get('/type/:type', badgeController.getByType);
router.get('/creator/:admin_id', badgeController.getByCreator);
router.get('/:id', badgeController.getById);
router.get('/:id/users-count', badgeController.countUsersWithBadge);

// Routes protégées - Admin uniquement
router.post('/', authenticate, isAdmin, badgeController.create);
router.put('/:id', authenticate, isAdmin, badgeController.update);
router.delete('/:id', authenticate, isAdmin, badgeController.delete);

export default router;