import { Request, Response } from 'express';
import badgeService from '../services/Badge.service';
import { CreateBadgeInput, UpdateBadgeInput, BadgeType } from '../models/Badge.interface';

export class BadgeController {
  // Créer un badge (Admin uniquement - vérifié par middleware isAdmin)
  async create(req: Request, res: Response) {
    try {
      const data: CreateBadgeInput = req.body;
      const created_by = req.user!.userId; // Utiliser userId au lieu de id

      const badge = await badgeService.create(data, created_by);

      res.status(201).json({
        success: true,
        message: 'Badge created successfully',
        data: badge,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating badge',
        error: error.message,
      });
    }
  }

  // Récupérer tous les badges
  async getAll(req: Request, res: Response) {
    try {
      const badges = await badgeService.getAll();

      res.status(200).json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badges',
        error: error.message,
      });
    }
  }

  // Récupérer un badge par ID
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      const badge = await badgeService.getById(id);

      if (!badge) {
        return res.status(404).json({
          success: false,
          message: 'Badge not found',
        });
      }

      res.status(200).json({
        success: true,
        data: badge,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badge',
        error: error.message,
      });
    }
  }

  // Récupérer badges par type
  async getByType(req: Request, res: Response) {
    try {
      const badge_type = req.params.type.toUpperCase() as BadgeType;

      if (!Object.values(BadgeType).includes(badge_type)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge type',
          validTypes: Object.values(BadgeType),
        });
      }

      const badges = await badgeService.getByType(badge_type);

      res.status(200).json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badges by type',
        error: error.message,
      });
    }
  }

  // Rechercher des badges
  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string;

      if (!query || query.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }

      const badges = await badgeService.search(query);

      res.status(200).json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error searching badges',
        error: error.message,
      });
    }
  }

  // Statistiques des badges
  async getStats(req: Request, res: Response) {
    try {
      const stats = await badgeService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badge statistics',
        error: error.message,
      });
    }
  }

  // Récupérer badges créés par un admin
  async getByCreator(req: Request, res: Response) {
    try {
      const created_by = parseInt(req.params.admin_id);

      if (isNaN(created_by)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid admin ID',
        });
      }

      const badges = await badgeService.getByCreator(created_by);

      res.status(200).json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching admin badges',
        error: error.message,
      });
    }
  }

  // Mettre à jour un badge (Admin uniquement - vérifié par middleware isAdmin)
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      const data: UpdateBadgeInput = req.body;
      const badge = await badgeService.update(id, data);

      res.status(200).json({
        success: true,
        message: 'Badge updated successfully',
        data: badge,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating badge',
        error: error.message,
      });
    }
  }

  // Supprimer un badge (Admin uniquement - vérifié par middleware isAdmin)
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      await badgeService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Badge deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting badge',
        error: error.message,
      });
    }
  }

  // Compter utilisateurs ayant un badge
  async countUsersWithBadge(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      const count = await badgeService.countUsersWithBadge(id);

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error counting users',
        error: error.message,
      });
    }
  }
}

export default new BadgeController();