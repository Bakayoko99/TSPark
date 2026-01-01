import { Request, Response } from 'express';
import exerciceTypeService from '../services/ExerciceType.service';
import { CreateExerciceTypeInput, UpdateExerciceTypeInput } from '../models/ExerciceType.interface';
import { DifficultyLevel as PrismaDifficultyLevel } from '@prisma/client';

export class ExerciceTypeController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateExerciceTypeInput = req.body;
      const exerciceType = await exerciceTypeService.createExerciceType(data);
      res.status(201).json({
        success: true,
        message: 'Exercice type created successfully',
        data: exerciceType,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating exercice type',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const exerciceTypes = await exerciceTypeService.getAllExerciceTypes();
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching exercice types',
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
          message: 'Invalid exercice type ID',
        });
      }
      
      const exerciceType = await exerciceTypeService.getExerciceTypeById(id);
      
      if (!exerciceType) {
        return res.status(404).json({
          success: false,
          message: 'Exercice type not found',
        });
      }

      res.status(200).json({
        success: true,
        data: exerciceType,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching exercice type',
        error: error.message,
      });
    }
  }

  async getByDifficulty(req: Request, res: Response) {
    try {
      const difficulty = req.params.difficulty.toUpperCase() as PrismaDifficultyLevel;
      
      if (!Object.values(PrismaDifficultyLevel).includes(difficulty)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid difficulty level',
          validLevels: Object.values(PrismaDifficultyLevel),
        });
      }
      
      const exerciceTypes = await exerciceTypeService.getExerciceTypesByDifficulty(difficulty);
      
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching exercice types',
        error: error.message,
      });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }
      
      const exerciceTypes = await exerciceTypeService.searchExerciceTypesByName(q);
      
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error searching exercice types',
        error: error.message,
      });
    }
  }

  async getByCalories(req: Request, res: Response) {
    try {
      const { min, max } = req.query;
      
      if (!min) {
        return res.status(400).json({
          success: false,
          message: 'Minimum calories parameter is required',
        });
      }

      const minCalories = parseInt(min as string);
      
      if (isNaN(minCalories)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid calories value',
        });
      }

      let exerciceTypes;

      if (max) {
        const maxCalories = parseInt(max as string);
        if (isNaN(maxCalories)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid max calories value',
          });
        }
        exerciceTypes = await exerciceTypeService.getExerciceTypesByCaloriesRange(minCalories, maxCalories);
      } else {
        exerciceTypes = await exerciceTypeService.getExerciceTypesByCalories(minCalories);
      }
      
      res.status(200).json({
        success: true,
        data: exerciceTypes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching exercice types',
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
          message: 'Invalid exercice type ID',
        });
      }
      
      const data: UpdateExerciceTypeInput = req.body;
      const exerciceType = await exerciceTypeService.updateExerciceType(id, data);
      
      res.status(200).json({
        success: true,
        message: 'Exercice type updated successfully',
        data: exerciceType,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating exercice type',
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
          message: 'Invalid exercice type ID',
        });
      }
      
      await exerciceTypeService.deleteExerciceType(id);
      
      res.status(200).json({
        success: true,
        message: 'Exercice type deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting exercice type',
        error: error.message,
      });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const stats = await exerciceTypeService.getExerciceTypesStats();
      
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching statistics',
        error: error.message,
      });
    }
  }
}

export default new ExerciceTypeController();