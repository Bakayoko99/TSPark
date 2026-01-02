import { Request, Response } from 'express';
import workoutSessionService from '../services/WorkoutSession.service';
import { CreateWorkoutSessionInput, UpdateWorkoutSessionInput, WorkoutSessionFilters } from '../models/WorkoutSession.interface';

export class WorkoutSessionController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const data: CreateWorkoutSessionInput = req.body;
      const session = await workoutSessionService.createSession({
        ...data,
        user_id: req.user.userId,
      });

      res.status(201).json({
        success: true,
        message: 'Workout session created successfully',
        data: session,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating workout session',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const sessions = await workoutSessionService.getAllSessions();

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workout sessions',
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
          message: 'Invalid session ID',
        });
      }

      const session = await workoutSessionService.getSessionById(id);

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Workout session not found',
        });
      }

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching workout session',
        error: error.message,
      });
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const sessions = await workoutSessionService.getSessionsByUserId(user_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user sessions',
        error: error.message,
      });
    }
  }

  async getMySessions(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const sessions = await workoutSessionService.getSessionsByUserId(req.user.userId);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching your sessions',
        error: error.message,
      });
    }
  }

  async getByChallengeId(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const sessions = await workoutSessionService.getSessionsByChallengeId(challenge_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenge sessions',
        error: error.message,
      });
    }
  }

  async getByGymId(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);

      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }

      const sessions = await workoutSessionService.getSessionsByGymId(gym_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching gym sessions',
        error: error.message,
      });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const filters: WorkoutSessionFilters = {
        user_id: req.query.user_id ? parseInt(req.query.user_id as string) : undefined,
        challenge_id: req.query.challenge_id ? parseInt(req.query.challenge_id as string) : undefined,
        gym_id: req.query.gym_id ? parseInt(req.query.gym_id as string) : undefined,
        start_date: req.query.start_date ? new Date(req.query.start_date as string) : undefined,
        end_date: req.query.end_date ? new Date(req.query.end_date as string) : undefined,
        min_duration: req.query.min_duration ? parseInt(req.query.min_duration as string) : undefined,
        max_duration: req.query.max_duration ? parseInt(req.query.max_duration as string) : undefined,
        min_calories: req.query.min_calories ? parseInt(req.query.min_calories as string) : undefined,
        max_calories: req.query.max_calories ? parseInt(req.query.max_calories as string) : undefined,
      };

      const sessions = await workoutSessionService.searchSessions(filters);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error searching sessions',
        error: error.message,
      });
    }
  }

  async getToday(req: Request, res: Response) {
    try {
      const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;
      const sessions = await workoutSessionService.getTodaySessions(user_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching today sessions',
        error: error.message,
      });
    }
  }

  async getWeekly(req: Request, res: Response) {
    try {
      const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;
      const sessions = await workoutSessionService.getWeeklySessions(user_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching weekly sessions',
        error: error.message,
      });
    }
  }

  async getMonthly(req: Request, res: Response) {
    try {
      const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;
      const sessions = await workoutSessionService.getMonthlySessions(user_id);

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching monthly sessions',
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
          message: 'Invalid session ID',
        });
      }

      const data: UpdateWorkoutSessionInput = req.body;
      const session = await workoutSessionService.updateSession(id, data);

      res.status(200).json({
        success: true,
        message: 'Workout session updated successfully',
        data: session,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating workout session',
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
          message: 'Invalid session ID',
        });
      }

      await workoutSessionService.deleteSession(id);

      res.status(200).json({
        success: true,
        message: 'Workout session deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting workout session',
        error: error.message,
      });
    }
  }

  async getUserStats(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const stats = await workoutSessionService.getUserStats(req.user.userId);

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

  async getChallengeStats(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const stats = await workoutSessionService.getChallengeStats(challenge_id);

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

  async getGymStats(req: Request, res: Response) {
    try {
      const gym_id = parseInt(req.params.gym_id);

      if (isNaN(gym_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gym ID',
        });
      }

      const stats = await workoutSessionService.getGymStats(gym_id);

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

  async getTopUsers(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const topUsers = await workoutSessionService.getTopUsers(limit);

      res.status(200).json({
        success: true,
        data: topUsers,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching top users',
        error: error.message,
      });
    }
  }
}

export default new WorkoutSessionController();