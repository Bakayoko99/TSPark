import { Router } from 'express';
import salleController from '../controllers/Salle.controller';
import { authenticate, isAdmin, isAdminOrGymOwner } from '../middlewares/auth.middleware';


const router = Router();

// CRUD routes
router.post('/', salleController.create);
// Routes publiques (consultation)
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


// Routes protégées - ADMIN ou GYM_OWNER
router.post('/', authenticate, isAdminOrGymOwner, salleController.create);
router.put('/:id', authenticate, isAdminOrGymOwner, salleController.update);
router.delete('/:id', authenticate, isAdminOrGymOwner, salleController.delete);

// Routes propriétaire
router.get('/owner/:owner_id', authenticate, salleController.getByOwnerId);

// Routes ADMIN uniquement
router.patch('/:id/approve', authenticate, isAdmin, salleController.approve);
router.patch('/:id/activate', authenticate, isAdmin, salleController.activate);
router.patch('/:id/deactivate', authenticate, isAdmin, salleController.deactivate);

export default router;