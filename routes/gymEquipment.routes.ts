import { Router } from 'express';
import gymEquipmentController from '../controllers/GymEquipment.controller';

const router = Router();

router.post('/', gymEquipmentController.addEquipmentToGym);

router.get('/gym/:gym_id', gymEquipmentController.getEquipmentsByGymId);

router.get('/equipment/:equipment_id', gymEquipmentController.getGymsByEquipmentId);

router.get('/:id', gymEquipmentController.getById);

router.get('/gym/:gym_id/equipment/:equipment_id', gymEquipmentController.getByGymAndEquipmentIds);

router.put('/:id', gymEquipmentController.update);

router.delete('/:id', gymEquipmentController.delete);

router.delete('/gym/:gym_id/all', gymEquipmentController.deleteAllByGymId);

router.get('/gym/:gym_id/count', gymEquipmentController.countEquipmentsByGymId);
router.get('/gym/:gym_id/total-quantity', gymEquipmentController.getTotalQuantityByGymId);

export default router;