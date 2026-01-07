import { Request, Response } from 'express';
import userDefiService from '../services/UserDefi.service';
import { UpdateProgressInput, BulkInviteInput } from '../models/UserDefi.interface';
import { UserDefiStatus as PrismaUserDefiStatus } from '@prisma/client';

export class UserDefiController {
  async joinDefi(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const { challenge_id } = req.body;
      const participation = await userDefiService.joinDefi(req.user.userId, challenge_id);

      res.status(201).json({
        success: true,
        message: 'Successfully joined the challenge',
        data: participation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error joining challenge',
        error: error.message,
      });
    }
  }

  async inviteUser(req: Request, res: Response) {
    try {
      const { user_id, challenge_id } = req.body;
      const invitation = await userDefiService.inviteUser(user_id, challenge_id);

      res.status(201).json({
        success: true,
        message: 'User invited successfully',
        data: invitation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error inviting user',
        error: error.message,
      });
    }
  }

  async inviteMultipleUsers(req: Request, res: Response) {
    try {
      const data: BulkInviteInput = req.body;
      const invitations = await userDefiService.inviteMultipleUsers(data.challenge_id, data.user_ids);

      res.status(201).json({
        success: true,
        message: `${invitations.length} users invited successfully`,
        data: invitations,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error inviting users',
        error: error.message,
      });
    }
  }

  async acceptInvitation(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const { challenge_id } = req.body;
      const participation = await userDefiService.acceptInvitation(req.user.userId, challenge_id);

      res.status(200).json({
        success: true,
        message: 'Invitation accepted',
        data: participation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error accepting invitation',
        error: error.message,
      });
    }
  }

  async startDefi(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const { challenge_id } = req.body;
      const participation = await userDefiService.startDefi(req.user.userId, challenge_id);

      res.status(200).json({
        success: true,
        message: 'Challenge started',
        data: participation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error starting challenge',
        error: error.message,
      });
    }
  }

  async updateProgress(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const { challenge_id } = req.params;
      const data: UpdateProgressInput = req.body;

      const participation = await userDefiService.updateProgress(
        req.user.userId,
        parseInt(challenge_id),
        data
      );

      res.status(200).json({
        success: true,
        message: 'Progress updated successfully',
        data: participation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating progress',
        error: error.message,
      });
    }
  }

  async abandonDefi(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const { challenge_id } = req.body;
      const participation = await userDefiService.abandonDefi(req.user.userId, challenge_id);

      res.status(200).json({
        success: true,
        message: 'Challenge abandoned',
        data: participation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error abandoning challenge',
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

      const defis = await userDefiService.getUserDefis(req.user.userId);

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

  async getMyDefisByStatus(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const status = req.params.status.toUpperCase() as PrismaUserDefiStatus;

      if (!Object.values(PrismaUserDefiStatus).includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status',
          validStatuses: Object.values(PrismaUserDefiStatus),
        });
      }

      const defis = await userDefiService.getUserDefisByStatus(req.user.userId, status);

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

  async getDefiParticipants(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const participants = await userDefiService.getDefiParticipants(challenge_id);

      res.status(200).json({
        success: true,
        data: participants,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching participants',
        error: error.message,
      });
    }
  }

  async getParticipation(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(user_id) || isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid IDs',
        });
      }

      const participation = await userDefiService.getParticipation(user_id, challenge_id);

      if (!participation) {
        return res.status(404).json({
          success: false,
          message: 'Participation not found',
        });
      }

      res.status(200).json({
        success: true,
        data: participation,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching participation',
        error: error.message,
      });
    }
  }

  async countParticipants(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const count = await userDefiService.countParticipants(challenge_id);

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error counting participants',
        error: error.message,
      });
    }
  }

  async getLeaderboard(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const leaderboard = await userDefiService.getLeaderboard(challenge_id);

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

  async leaveDefi(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      await userDefiService.leaveDefi(req.user.userId, challenge_id);

      res.status(200).json({
        success: true,
        message: 'Successfully left the challenge',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error leaving challenge',
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

      const stats = await userDefiService.getUserStats(req.user.userId);

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

  async getDefiStats(req: Request, res: Response) {
    try {
      const challenge_id = parseInt(req.params.challenge_id);

      if (isNaN(challenge_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid challenge ID',
        });
      }

      const stats = await userDefiService.getDefiStats(challenge_id);

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

export default new UserDefiController();