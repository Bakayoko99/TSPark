import { Router } from 'express';
import workoutSessionController from '../controllers/WorkoutSession.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
router.get('/search', workoutSessionController.search);
router.get('/today', workoutSessionController.getToday);
router.get('/weekly', workoutSessionController.getWeekly);
router.get('/monthly', workoutSessionController.getMonthly);
router.get('/top-users', workoutSessionController.getTopUsers);
router.get('/user/:user_id', workoutSessionController.getByUserId);
router.get('/challenge/:challenge_id', workoutSessionController.getByChallengeId);
router.get('/challenge/:challenge_id/stats', workoutSessionController.getChallengeStats);
router.get('/gym/:gym_id', workoutSessionController.getByGymId);
router.get('/gym/:gym_id/stats', workoutSessionController.getGymStats);
router.get('/:id', workoutSessionController.getById);
router.get('/', workoutSessionController.getAll);

// Routes protégées - Utilisateur authentifié
router.post('/', authenticate, workoutSessionController.create);
router.get('/my/sessions', authenticate, workoutSessionController.getMySessions);
router.get('/my/stats', authenticate, workoutSessionController.getUserStats);
router.put('/:id', authenticate, workoutSessionController.update);
router.delete('/:id', authenticate, workoutSessionController.delete);

export default router;