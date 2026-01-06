import { Request, Response } from 'express';
import gymExerciceTypeService from '../services/GymExerciceType.service';
import { CreateGymExerciceTypeInput } from '../models/GymExerciceType.interface';

export class GymExerciceTypeController {
  async addExerciceTypeToGym(req: Request, res: Response) {
    try {
      const data: CreateGymExerciceTypeInput = req.body;
      const gymExerciceType = await gymExerciceTypeService.addExerciceTypeToGym(data);
      res.status(201).json({
        success: true,
        message: 'Exercice type added to gym successfully',
        data: gymExerciceType,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding exercice type to gym',
        error: error.message,
      });
    }
  }

  async addMultipleExerciceTypesToGym(req: Request, res: Response) {
    try {
      const { gym_id, exercice_type_ids } = req.body;

      if (!Array.isArray(exercice_type_ids) || exercice_type_ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'exercice_type_ids must be a non-empty array',
        });
      }

      const result = await gymExerciceTypeService.addMultipleExerciceTypesToGym(gym_id, exercice_type_ids);
      
      res.status(201).json({
        success: true,
        message: `${result.count} exercice types added to gym successfully`,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding multiple exercice types to gym',
        error: error.message,
      });
    }
  }

  async getExerciceTypesByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const exerciceTypes = await gymExerciceTypeService.getExerciceTypesByGymId(gym_id);
      
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym exercice types',
        error: error.message,
      });
    }
  }

  async getGymsByExerciceTypeId(req: Request, res: Response) {
    try {
      const exercice_type_id = parseInt(req.params.exercice_type_id);
      
      if (isNaN(exercice_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid exercice type ID',
        });
      }
      
      const gyms = await gymExerciceTypeService.getGymsByExerciceTypeId(exercice_type_id);
      
      res.status(200).json({
        success: true,
        data: gyms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gyms with exercice type',
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
          message: 'Invalid gym exercice type ID',
        });
      }
      
      const gymExerciceType = await gymExerciceTypeService.getGymExerciceTypeById(id);
      
      if (!gymExerciceType) {
        return res.status(404).json({
          success: false,
          message: 'Gym exercice type not found',
        });
      }

      res.status(200).json({
        success: true,
        data: gymExerciceType,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym exercice type',
        error: error.message,
      });
    }
  }

  async getByGymAndExerciceTypeIds(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      const exercice_type_id = parseInt(req.params.exercice_type_id);
      
      if (isNaN(gym_id) || isNaN(exercice_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID or exercice type ID',
        });
      }
      
      const gymExerciceType = await gymExerciceTypeService.getGymExerciceTypeByIds(gym_id, exercice_type_id);
      
      if (!gymExerciceType) {
        return res.status(404).json({
          success: false,
          message: 'Gym exercice type not found',
        });
      }

      res.status(200).json({
        success: true,
        data: gymExerciceType,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym exercice type',
        error: error.message,
      });
    }
  }

  async getByGymIdAndDifficulty(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      const difficulty = req.params.difficulty;
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const exerciceTypes = await gymExerciceTypeService.getExerciceTypesByGymIdAndDifficulty(gym_id, difficulty);
      
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym exercice types',
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
          message: 'Invalid gym exercice type ID',
        });
      }
      
      await gymExerciceTypeService.deleteGymExerciceType(id);
      
      res.status(200).json({
        success: true,
        message: 'Exercice type removed from gym successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing exercice type from gym',
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
      
      const result = await gymExerciceTypeService.deleteAllGymExerciceTypes(gym_id);
      
      res.status(200).json({
        success: true,
        message: 'All exercice types removed from gym successfully',
        data: { count: result.count },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing all exercice types from gym',
        error: error.message,
      });
    }
  }

  async countExerciceTypesByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const count = await gymExerciceTypeService.countExerciceTypesByGymId(gym_id);
      
      res.status(200).json({
        success: true,
        data: { gym_id, exercice_type_count: count },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error counting gym exercice types',
        error: error.message,
      });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);
      
      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }
      
      const stats = await gymExerciceTypeService.getGymExerciceTypeStats(gym_id);
      
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym exercice type statistics',
        error: error.message,
      });
    }
  }
}

export default new GymExerciceTypeController();