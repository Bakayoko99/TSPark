import { Router } from 'express';
import salleController from '../controllers/Salle.controller';

const router = Router();

// CRUD routes
router.post('/', salleController.create);
router.get('/', salleController.getAll);
router.get('/:id', salleController.getById);
router.put('/:id', salleController.update);
router.delete('/:id', salleController.delete);

// Routes supplémentaires
router.get('/owner/:owner_id', salleController.getByOwnerId);
router.get('/status/:status', salleController.getByStatus);
router.patch('/:id/approve', salleController.approve);
router.patch('/:id/activate', salleController.activate);
router.patch('/:id/deactivate', salleController.deactivate);

export default router;