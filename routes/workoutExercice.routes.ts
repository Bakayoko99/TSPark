import { Router } from 'express';
import workoutExerciceController from '../controllers/WorkoutExercice.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/session/:session_id/count', workoutExerciceController.countExercicesBySessionId);
router.get('/session/:session_id/calories', workoutExerciceController.calculateSessionCalories);
router.get('/session/:session_id/stats', workoutExerciceController.getSessionStats);
router.get('/session/:session_id', workoutExerciceController.getExercicesBySessionId);
router.get('/exercise-type/:exercise_type_id', workoutExerciceController.getSessionsByExerciceTypeId);
router.get('/user/:user_id', workoutExerciceController.getExercicesByUserId);
router.get('/:id', workoutExerciceController.getById);

// Routes protégées - Utilisateur authentifié
router.post('/', authenticate, workoutExerciceController.addExerciceToSession);
router.post('/bulk', authenticate, workoutExerciceController.addMultipleExercicesToSession);
router.get('/my/exercises', authenticate, workoutExerciceController.getMyExercices);
router.get('/my/most-practiced', authenticate, workoutExerciceController.getMostPracticedExercices);
router.get('/my/progress/:exercise_type_id', authenticate, workoutExerciceController.getExerciceProgress);
router.get('/my/stats', authenticate, workoutExerciceController.getUserExerciceStats);
router.put('/:id', authenticate, workoutExerciceController.update);
router.delete('/session/:session_id/all', authenticate, workoutExerciceController.deleteAllBySessionId);
router.delete('/:id', authenticate, workoutExerciceController.delete);

export default router;