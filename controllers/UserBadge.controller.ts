import { Request, Response } from 'express';
import userBadgeService from '../services/UserBadge.service';
import { AwardBadgeInput } from '../models/BadgeRule.interface';

export class UserBadgeController {
  // Attribuer un badge manuellement (Admin)
  async awardBadge(req: Request, res: Response) {
    try {
      const data: AwardBadgeInput = {
        user_id: parseInt(req.body.user_id),
        badge_id: parseInt(req.body.badge_id),
        awarded_by: req.user!.userId,
      };

      const userBadge = await userBadgeService.awardBadge(data);

      res.status(201).json({
        success: true,
        message: 'Badge awarded successfully',
        data: userBadge,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error awarding badge',
        error: error.message,
      });
    }
  }

  // Attribuer automatiquement les badges éligibles
  async autoAwardBadges(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const awarded = await userBadgeService.autoAwardBadges(user_id);

      res.status(200).json({
        success: true,
        message: `${awarded.length} badge(s) awarded automatically`,
        data: awarded,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error auto-awarding badges',
        error: error.message,
      });
    }
  }

  // Récupérer les badges d'un utilisateur
  async getUserBadges(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const badges = await userBadgeService.getUserBadges(user_id);

      res.status(200).json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user badges',
        error: error.message,
      });
    }
  }

  // Récupérer les utilisateurs ayant un badge
  async getUsersByBadge(req: Request, res: Response) {
    try {
      const badge_id = parseInt(req.params.badge_id);

      if (isNaN(badge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      const users = await userBadgeService.getUsersByBadge(badge_id);

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message,
      });
    }
  }

  // Retirer un badge (Admin)
  async revokeBadge(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.body.user_id);
      const badge_id = parseInt(req.body.badge_id);

      if (isNaN(user_id) || isNaN(badge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID or badge ID',
        });
      }

      await userBadgeService.revokeBadge(user_id, badge_id);

      res.status(200).json({
        success: true,
        message: 'Badge revoked successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error revoking badge',
        error: error.message,
      });
    }
  }

  // Statistiques badges utilisateur
  async getUserBadgeStats(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const stats = await userBadgeService.getUserBadgeStats(user_id);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user badge stats',
        error: error.message,
      });
    }
  }

  // Classement des utilisateurs
  async getLeaderboard(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await userBadgeService.getLeaderboard(limit);

      res.status(200).json({
        success: true,
        data: leaderboard,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching leaderboard',
        error: error.message,
      });
    }
  }
}

export default new UserBadgeController();