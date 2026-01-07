import { Request, Response } from 'express';
import gymEquipmentService from '../services/GymEquipment.service';
import { CreateGymEquipmentInput, UpdateGymEquipmentInput } from '../models/GymEquipment.interface';

export class GymEquipmentController {
  async addEquipmentToGym(req: Request, res: Response) {
    try {
      const data: CreateGymEquipmentInput = req.body;
      const gymEquipment = await gymEquipmentService.addEquipmentToGym(data);
      res.status(201).json({
        success: true,
        message: 'Equipment added to gym successfully',
        data: gymEquipment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding equipment to gym',
        error: error.message,
      });
    }
  }

  async getEquipmentsByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const equipments = await gymEquipmentService.getEquipmentsByGymId(gym_id);
      
      res.status(200).json({
        success: true,
        data: equipments,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym equipments',
        error: error.message,
      });
    }
  }

  async getGymsByEquipmentId(req: Request, res: Response) {
    try {
      const equipment_id = parseInt(req.params.equipment_id);
      
      if (isNaN(equipment_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid equipment ID',
        });
      }
      
      const gyms = await gymEquipmentService.getGymsByEquipmentId(equipment_id);
      
      res.status(200).json({
        success: true,
        data: gyms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gyms with equipment',
        error: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym equipment ID',
        });
      }
      
      const gymEquipment = await gymEquipmentService.getGymEquipmentById(id);
      
      if (!gymEquipment) {
        return res.status(404).json({
          success: false,
          message: 'Gym equipment not found',
        });
      }

      res.status(200).json({
        success: true,
        data: gymEquipment,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym equipment',
        error: error.message,
      });
    }
  }

  async getByGymAndEquipmentIds(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      const equipment_id = parseInt(req.params.equipment_id);
      
      if (isNaN(gym_id) || isNaN(equipment_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID or equipment ID',
        });
      }
      
      const gymEquipment = await gymEquipmentService.getGymEquipmentByIds(gym_id, equipment_id);
      
      if (!gymEquipment) {
        return res.status(404).json({
          success: false,
          message: 'Gym equipment not found',
        });
      }

      res.status(200).json({
        success: true,
        data: gymEquipment,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym equipment',
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym equipment ID',
        });
      }
      
      const data: UpdateGymEquipmentInput = req.body;
      const gymEquipment = await gymEquipmentService.updateGymEquipment(id, data);
      
      res.status(200).json({
        success: true,
        message: 'Gym equipment updated successfully',
        data: gymEquipment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating gym equipment',
        error: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym equipment ID',
        });
      }
      
      await gymEquipmentService.deleteGymEquipment(id);
      
      res.status(200).json({
        success: true,
        message: 'Equipment removed from gym successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing equipment from gym',
        error: error.message,
      });
    }
  }

  async deleteAllByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const result = await gymEquipmentService.deleteAllGymEquipments(gym_id);
      
      res.status(200).json({
        success: true,
        message: `All equipments removed from gym successfully`,
        data: { count: result.count },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing all equipments from gym',
        error: error.message,
      });
    }
  }

  async countEquipmentsByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const count = await gymEquipmentService.countEquipmentsByGymId(gym_id);
      
      res.status(200).json({
        success: true,
        data: { gym_id, equipment_count: count },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error counting gym equipments',
        error: error.message,
      });
    }
  }

  async getTotalQuantityByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const totalQuantity = await gymEquipmentService.getTotalQuantityByGymId(gym_id);
      
      res.status(200).json({
        success: true,
        data: { gym_id, total_quantity: totalQuantity },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error calculating total quantity',
        error: error.message,
      });
    }
  }
}

export default new GymEquipmentController();