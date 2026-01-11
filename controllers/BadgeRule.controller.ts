import { Request, Response } from 'express';
import badgeRuleService from '../services/BadgeRule.service';
import { CreateBadgeRuleInput, UpdateBadgeRuleInput, BadgeRuleType } from '../models/BadgeRule.interface';

export class BadgeRuleController {
  // Créer une règle
  async create(req: Request, res: Response) {
    try {
      const data: CreateBadgeRuleInput = req.body;
      const rule = await badgeRuleService.create(data);

      res.status(201).json({
        success: true,
        message: 'Badge rule created successfully',
        data: rule,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating badge rule',
        error: error.message,
      });
    }
  }

  // Récupérer toutes les règles
  async getAll(req: Request, res: Response) {
    try {
      const rules = await badgeRuleService.getAll();

      res.status(200).json({
        success: true,
        data: rules,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badge rules',
        error: error.message,
      });
    }
  }

  // Récupérer les règles d'un badge
  async getByBadgeId(req: Request, res: Response) {
    try {
      const badge_id = parseInt(req.params.badge_id);

      if (isNaN(badge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid badge ID',
        });
      }

      const rules = await badgeRuleService.getByBadgeId(badge_id);

      res.status(200).json({
        success: true,
        data: rules,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching badge rules',
        error: error.message,
      });
    }
  }

  // Récupérer une règle par ID
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rule ID',
        });
      }

      const rule = await badgeRuleService.getById(id);

      if (!rule) {
        return res.status(404).json({
          success: false,
          message: 'Rule not found',
        });
      }

      res.status(200).json({
        success: true,
        data: rule,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching rule',
        error: error.message,
      });
    }
  }

  // Mettre à jour une règle
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rule ID',
        });
      }

      const data: UpdateBadgeRuleInput = req.body;
      const rule = await badgeRuleService.update(id, data);

      res.status(200).json({
        success: true,
        message: 'Badge rule updated successfully',
        data: rule,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating badge rule',
        error: error.message,
      });
    }
  }

  // Supprimer une règle
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rule ID',
        });
      }

      await badgeRuleService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Badge rule deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting badge rule',
        error: error.message,
      });
    }
  }

  // Activer/Désactiver une règle
  async toggleActive(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rule ID',
        });
      }

      const rule = await badgeRuleService.toggleActive(id);

      res.status(200).json({
        success: true,
        message: 'Badge rule status toggled successfully',
        data: rule,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error toggling badge rule',
        error: error.message,
      });
    }
  }

  // Vérifier l'éligibilité d'un utilisateur
  async checkEligibility(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);

      if (isNaN(user_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }

      const eligibleBadges = await badgeRuleService.checkUserEligibility(user_id);

      res.status(200).json({
        success: true,
        data: {
          user_id,
          eligible_badge_ids: eligibleBadges,
          count: eligibleBadges.length,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error checking user eligibility',
        error: error.message,
      });
    }
  }
}

export default new BadgeRuleController();