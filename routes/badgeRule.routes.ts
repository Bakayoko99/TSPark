import { Router } from 'express';
import badgeRuleController from '../controllers/BadgeRule.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/', badgeRuleController.getAll);
router.get('/badge/:badge_id', badgeRuleController.getByBadgeId);
router.get('/:id', badgeRuleController.getById);

// Routes Admin uniquement
router.post('/', authenticate, isAdmin, badgeRuleController.create);
router.put('/:id', authenticate, isAdmin, badgeRuleController.update);
router.delete('/:id', authenticate, isAdmin, badgeRuleController.delete);
router.patch('/:id/toggle', authenticate, isAdmin, badgeRuleController.toggleActive);
router.get('/check-eligibility/:user_id', authenticate, isAdmin, badgeRuleController.checkEligibility);

export default router;