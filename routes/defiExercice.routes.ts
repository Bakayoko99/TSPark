import { Router } from 'express';
import defiExerciceController from '../controllers/DefiExercice.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/challenge/:challenge_id', defiExerciceController.getExercicesByDefiId);
router.get('/exercise-type/:exercise_type_id', defiExerciceController.getDefisByExerciceTypeId);
router.get('/challenge/:challenge_id/count', defiExerciceController.countExercicesByDefiId);
router.get('/challenge/:challenge_id/calories', defiExerciceController.calculateTotalCalories);
router.get('/challenge/:challenge_id/stats', defiExerciceController.getStats);
router.get('/:challenge_id/:exercise_type_id', defiExerciceController.getByDefiAndExerciceIds);
router.get('/:id', defiExerciceController.getById);

// Routes protégées - Créateur du défi uniquement
router.post('/', authenticate, defiExerciceController.addExerciceToDefi);
router.post('/bulk', authenticate, defiExerciceController.addMultipleExercicesToDefi);
router.patch('/challenge/:challenge_id/reorder', authenticate, defiExerciceController.reorderExercices);
router.put('/:id', authenticate, defiExerciceController.update);
router.delete('/:id', authenticate, defiExerciceController.delete);
router.delete('/challenge/:challenge_id/all', authenticate, defiExerciceController.deleteAllByDefiId);

export default router;