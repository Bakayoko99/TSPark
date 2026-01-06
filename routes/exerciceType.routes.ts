import { Router } from 'express';
import exerciceTypeController from '../controllers/ExerciceType.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques (consultation)
router.get('/', exerciceTypeController.getAll);
router.get('/search', exerciceTypeController.search);
router.get('/difficulty/:difficulty', exerciceTypeController.getByDifficulty);
router.get('/calories', exerciceTypeController.getByCalories);
router.get('/stats', exerciceTypeController.getStats);
router.get('/:id', exerciceTypeController.getById);

// Routes protégées - ADMIN uniquement
router.post('/', authenticate, isAdmin, exerciceTypeController.create);
router.put('/:id', authenticate, isAdmin, exerciceTypeController.update);
router.delete('/:id', authenticate, isAdmin, exerciceTypeController.delete);

export default router;