import { Router } from 'express';
import equipmentController from '../controllers/Equipment.controller';

const router = Router();

// CRUD routes
router.post('/', equipmentController.create);
router.get('/', equipmentController.getAll);
router.get('/search', equipmentController.search);
router.get('/:id', equipmentController.getById);
router.put('/:id', equipmentController.update);
router.delete('/:id', equipmentController.delete);

export default router;