import { Request, Response } from 'express';
import defiExerciceService from '../services/DefiExercice.service';
import { CreateDefiExerciceInput, UpdateDefiExerciceInput, BulkCreateDefiExerciceInput, ReorderDefiExerciceInput } from '../models/DefiExercice.interface';

export class DefiExerciceController {
  async addExerciceToDefi(req: Request, res: Response) {
    try {
      const data: CreateDefiExerciceInput = req.body;
      const defiExercice = await defiExerciceService.addExerciceToDefi(data);

      res.status(201).json({
        success: true,
        message: 'Exercise added to challenge successfully',
        data: defiExercice,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding exercise to challenge',
        error: error.message,
      });
    }
  }

  async addMultipleExercicesToDefi(req: Request, res: Response) {
    try {
      const data: BulkCreateDefiExerciceInput = req.body;
      const defiExercices = await defiExerciceService.addMultipleExercicesToDefi(data);

      res.status(201).json({
        success: true,
        message: `${defiExercices.length} exercises added to challenge successfully`,
        data: defiExercices,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding exercises to challenge',
        error: error.message,
      });
    }
  }

  async getExercicesByDefiId(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const exercises = await defiExerciceService.getExercicesByDefiId(challenge_id);

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenge exercises',
        error: error.message,
      });
    }
  }

  async getDefisByExerciceTypeId(req: Request, res: Response) {
    try {
      const exercise_type_id = parseInt(req.params.exercise_type_id);

      if (isNaN(exercise_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid exercise type ID',
        });
      }

      const defis = await defiExerciceService.getDefisByExerciceTypeId(exercise_type_id);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges with this exercise',
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
          message: 'Invalid ID',
        });
      }

      const defiExercice = await defiExerciceService.getById(id);

      if (!defiExercice) {
        return res.status(404).json({
          success: false,
          message: 'Challenge exercise not found',
        });
      }

      res.status(200).json({
        success: true,
        data: defiExercice,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenge exercise',
        error: error.message,
      });
    }
  }

  async getByDefiAndExerciceIds(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);
      const exercise_type_id = parseInt(req.params.exercise_type_id);

      if (isNaN(challenge_id) || isNaN(exercise_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid IDs',
        });
      }

      const defiExercice = await defiExerciceService.getByDefiAndExerciceIds(challenge_id, exercise_type_id);

      if (!defiExercice) {
        return res.status(404).json({
          success: false,
          message: 'Challenge exercise not found',
        });
      }

      res.status(200).json({
        success: true,
        data: defiExercice,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenge exercise',
        error: error.message,
      });
    }
  }

  async countExercicesByDefiId(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const count = await defiExerciceService.countExercicesByDefiId(challenge_id);

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error counting exercises',
        error: error.message,
      });
    }
  }

  async calculateTotalCalories(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const totalCalories = await defiExerciceService.calculateTotalCalories(challenge_id);

      res.status(200).json({
        success: true,
        data: { totalCalories },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error calculating calories',
        error: error.message,
      });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const stats = await defiExerciceService.getStats(challenge_id);

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

  async reorderExercices(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);
      const { newOrder }: { newOrder: ReorderDefiExerciceInput[] } = req.body;

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      if (!Array.isArray(newOrder)) {
        return res.status(400).json({
          success: false,
          message: 'newOrder must be an array',
        });
      }

      await defiExerciceService.reorderExercices(challenge_id, newOrder);

      res.status(200).json({
        success: true,
        message: 'Exercises reordered successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error reordering exercises',
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
          message: 'Invalid ID',
        });
      }

      const data: UpdateDefiExerciceInput = req.body;
      const defiExercice = await defiExerciceService.update(id, data);

      res.status(200).json({
        success: true,
        message: 'Challenge exercise updated successfully',
        data: defiExercice,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating challenge exercise',
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
          message: 'Invalid ID',
        });
      }

      await defiExerciceService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Exercise removed from challenge successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing exercise from challenge',
        error: error.message,
      });
    }
  }

  async deleteAllByDefiId(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const result = await defiExerciceService.deleteAllByDefiId(challenge_id);

      res.status(200).json({
        success: true,
        message: `${result.count} exercises removed from challenge`,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing exercises from challenge',
        error: error.message,
      });
    }
  }
}

export default new DefiExerciceController();