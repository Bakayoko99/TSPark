import { Request, Response } from 'express';
import defiService from '../services/Defi.service';
import { CreateDefiInput, UpdateDefiInput } from '../models/Defi.interface';
import { DefiStatus as PrismaDefiStatus, DifficultyLevel as PrismaDifficultyLevel } from '@prisma/client';

export class DefiController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const data: CreateDefiInput = req.body;

      const defiData = {
        ...data,
        creator_id: req.user.userId, 
      };

      const defi = await defiService.createDefi(defiData);
      
      res.status(201).json({
        success: true,
        message: 'Challenge created successfully',
        data: defi,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating challenge',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const defis = await defiService.getAllDefis();
      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges',
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
          message: 'Invalid challenge ID',
        });
      }

      const defi = await defiService.getDefiById(id);

      if (!defi) {
        return res.status(404).json({
          success: false,
          message: 'Challenge not found',
        });
      }

      res.status(200).json({
        success: true,
        data: defi,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenge',
        error: error.message,
      });
    }
  }

  async getByCreatorId(req: Request, res: Response) {
    try {
      const creator_id = parseInt(req.params.creator_id);

      if (isNaN(creator_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid creator ID',
        });
      }

      const defis = await defiService.getDefisByCreatorId(creator_id);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges',
        error: error.message,
      });
    }
  }

  async getMyDefis(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const defis = await defiService.getDefisByCreatorId(req.user.userId);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching your challenges',
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

      const defis = await defiService.getDefisByGymId(gym_id);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges',
        error: error.message,
      });
    }
  }

  async getByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status.toUpperCase() as PrismaDefiStatus;

      if (!Object.values(PrismaDefiStatus).includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status',
          validStatuses: Object.values(PrismaDefiStatus),
        });
      }

      const defis = await defiService.getDefisByStatus(status);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges',
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

      const defis = await defiService.getDefisByDifficulty(difficulty);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching challenges',
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

      const defis = await defiService.searchDefisByTitle(q);

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error searching challenges',
        error: error.message,
      });
    }
  }

  async getActive(req: Request, res: Response) {
    try {
      const defis = await defiService.getActiveDefis();

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching active challenges',
        error: error.message,
      });
    }
  }

  async getCollaborative(req: Request, res: Response) {
    try {
      const defis = await defiService.getCollaborativeDefis();

      res.status(200).json({
        success: true,
        data: defis,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching collaborative challenges',
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
          message: 'Invalid challenge ID',
        });
      }

      const data: UpdateDefiInput = req.body;
      const defi = await defiService.updateDefi(id, data);

      res.status(200).json({
        success: true,
        message: 'Challenge updated successfully',
        data: defi,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating challenge',
        error: error.message,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      if (!Object.values(PrismaDefiStatus).includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status',
          validStatuses: Object.values(PrismaDefiStatus),
        });
      }

      const defi = await defiService.updateDefiStatus(id, status);

      res.status(200).json({
        success: true,
        message: 'Challenge status updated successfully',
        data: defi,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating challenge status',
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
          message: 'Invalid challenge ID',
        });
      }

      await defiService.deleteDefi(id);

      res.status(200).json({
        success: true,
        message: 'Challenge deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting challenge',
        error: error.message,
      });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const stats = await defiService.getDefisStats();

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

export default new DefiController();