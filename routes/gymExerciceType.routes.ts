import { Router } from 'express';
import gymExerciceTypeController from '../controllers/GymExerciceType.controller';
import { authenticate, isAdminOrGymOwner } from '../middlewares/auth.middleware';
import { verifyGymOwnership, verifyGymExerciceTypeOwnership } from '../middlewares/gymOwnership.middleware';

const router = Router();

// Routes protégées - ADMIN ou GYM_OWNER (avec vérification de propriété)
router.post(
  '/',
  authenticate,
  isAdminOrGymOwner,
  verifyGymOwnership,
  gymExerciceTypeController.addExerciceTypeToGym
);

router.post(
  '/bulk',
  authenticate,
  isAdminOrGymOwner,
  verifyGymOwnership,
  gymExerciceTypeController.addMultipleExerciceTypesToGym
);

// Routes publiques spécifiques
router.get('/gym/:gym_id/difficulty/:difficulty', gymExerciceTypeController.getByGymIdAndDifficulty);
router.get('/gym/:gym_id/count', gymExerciceTypeController.countExerciceTypesByGymId);
router.get('/gym/:gym_id/stats', gymExerciceTypeController.getStats);
router.get('/gym/:gym_id/exercice-type/:exercice_type_id', gymExerciceTypeController.getByGymAndExerciceTypeIds);
router.get('/gym/:gym_id', gymExerciceTypeController.getExerciceTypesByGymId);
router.get('/exercice-type/:exercice_type_id', gymExerciceTypeController.getGymsByExerciceTypeId);

// Route générique avec :id
router.get('/:id', gymExerciceTypeController.getById);

// Routes de suppression protégées (avec vérification de propriété)
router.delete(
  '/gym/:gym_id/all',
  authenticate,
  isAdminOrGymOwner,
  verifyGymOwnership,
  gymExerciceTypeController.deleteAllByGymId
);

router.delete(
  '/:id',
  authenticate,
  isAdminOrGymOwner,
  verifyGymExerciceTypeOwnership,
  gymExerciceTypeController.delete
);

export default router;