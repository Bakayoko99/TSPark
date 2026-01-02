import { Request, Response } from 'express';
import workoutExerciceService from '../services/WorkoutExercice.service';
import { CreateWorkoutExerciceInput, UpdateWorkoutExerciceInput, BulkCreateWorkoutExerciceInput } from '../models/WorkoutExercice.interface';

export class WorkoutExerciceController {
  async addExerciceToSession(req: Request, res: Response) {
    try {
      const data: CreateWorkoutExerciceInput = req.body;
      const workoutExercice = await workoutExerciceService.addExerciceToSession(data);

      res.status(201).json({
        success: true,
        message: 'Exercise added to session successfully',
        data: workoutExercice,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding exercise to session',
        error: error.message,
      });
    }
  }

  async addMultipleExercicesToSession(req: Request, res: Response) {
    try {
      const data: BulkCreateWorkoutExerciceInput = req.body;
      const workoutExercices = await workoutExerciceService.addMultipleExercicesToSession(data);

      res.status(201).json({
        success: true,
        message: `${workoutExercices.length} exercises added to session successfully`,
        data: workoutExercices,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error adding exercises to session',
        error: error.message,
      });
    }
  }

  async getExercicesBySessionId(req: Request, res: Response) {
    try {
      const workout_session_id = parseInt(req.params.session_id);

      if (isNaN(workout_session_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID',
        });
      }

      const exercises = await workoutExerciceService.getExercicesBySessionId(workout_session_id);

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching session exercises',
        error: error.message,
      });
    }
  }

  async getSessionsByExerciceTypeId(req: Request, res: Response) {
    try {
      const exercise_type_id = parseInt(req.params.exercise_type_id);

      if (isNaN(exercise_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid exercise type ID',
        });
      }

      const sessions = await workoutExerciceService.getSessionsByExerciceTypeId(exercise_type_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching sessions with this exercise',
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

      const workoutExercice = await workoutExerciceService.getById(id);

      if (!workoutExercice) {
        return res.status(404).json({
          success: false,
          message: 'Workout exercise not found',
        });
      }

      res.status(200).json({
        success: true,
        data: workoutExercice,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workout exercise',
        error: error.message,
      });
    }
  }

  async countExercicesBySessionId(req: Request, res: Response) {
    try {
      const workout_session_id = parseInt(req.params.session_id);

      if (isNaN(workout_session_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID',
        });
      }

      const count = await workoutExerciceService.countExercicesBySessionId(workout_session_id);

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

  async calculateSessionCalories(req: Request, res: Response) {
    try {
      const workout_session_id = parseInt(req.params.session_id);

      if (isNaN(workout_session_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID',
        });
      }

      const totalCalories = await workoutExerciceService.calculateSessionCalories(workout_session_id);

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

  async getExercicesByUserId(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const exercises = await workoutExerciceService.getExercicesByUserId(user_id);

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user exercises',
        error: error.message,
      });
    }
  }

  async getMyExercices(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const exercises = await workoutExerciceService.getExercicesByUserId(req.user.userId);

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching your exercises',
        error: error.message,
      });
    }
  }

  async getMostPracticedExercices(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const exercises = await workoutExerciceService.getMostPracticedExercices(req.user.userId, limit);

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching most practiced exercises',
        error: error.message,
      });
    }
  }

  async getExerciceProgress(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const exercise_type_id = parseInt(req.params.exercise_type_id);

      if (isNaN(exercise_type_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid exercise type ID',
        });
      }

      const progress = await workoutExerciceService.getExerciceProgress(req.user.userId, exercise_type_id);

      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching exercise progress',
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

      const data: UpdateWorkoutExerciceInput = req.body;
      const workoutExercice = await workoutExerciceService.update(id, data);

      res.status(200).json({
        success: true,
        message: 'Workout exercise updated successfully',
        data: workoutExercice,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating workout exercise',
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

      await workoutExerciceService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Exercise removed from session successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing exercise from session',
        error: error.message,
      });
    }
  }

  async deleteAllBySessionId(req: Request, res: Response) {
    try {
      const workout_session_id = parseInt(req.params.session_id);

      if (isNaN(workout_session_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID',
        });
      }

      const result = await workoutExerciceService.deleteAllBySessionId(workout_session_id);

      res.status(200).json({
        success: true,
        message: `${result.count} exercises removed from session`,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error removing exercises from session',
        error: error.message,
      });
    }
  }

  async getSessionStats(req: Request, res: Response) {
    try {
      const workout_session_id = parseInt(req.params.session_id);

      if (isNaN(workout_session_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid session ID',
        });
      }

      const stats = await workoutExerciceService.getSessionStats(workout_session_id);

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

  async getUserExerciceStats(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const stats = await workoutExerciceService.getUserExerciceStats(req.user.userId);

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

export default new WorkoutExerciceController();