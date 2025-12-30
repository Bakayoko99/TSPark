import { Router } from 'express';
import userController from '../controllers/User.controller';

const router = Router();

// CRUD routes
router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

// Routes supplémentaires
router.patch('/:id/deactivate', userController.deactivate);
router.patch('/:id/activate', userController.activate);
router.patch('/:id/score', userController.updateScore);

export default router;