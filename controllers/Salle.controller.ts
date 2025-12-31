import { Request, Response } from 'express';
import salleService from '../services/Salle.service';
import { CreateSalleInput, UpdateSalleInput, ApproveSalleInput } from '../models/salle.interface';
import { SalleStatus as PrismaSalleStatus } from '@prisma/client';

export class SalleController {
  async create(req: Request, res: Response) {
    try {
      const salleData: CreateSalleInput = req.body;
      const salle = await salleService.createSalle(salleData);
      res.status(201).json({
        success: true,
        message: 'Salle created successfully',
        data: salle,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating salle',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const salles = await salleService.getAllSalles();
      res.status(200).json({
        success: true,
        data: salles,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching salles',
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
          message: 'Invalid salle ID',
        });
      }
      
      const salle = await salleService.getSalleById(id);
      
      if (!salle) {
        return res.status(404).json({
          success: false,
          message: 'Salle not found',
        });
      }

      res.status(200).json({
        success: true,
        data: salle,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching salle',
        error: error.message,
      });
    }
  }

  async getByOwnerId(req: Request, res: Response) {
    try {
      const owner_id = parseInt(req.params.owner_id);
      
      if (isNaN(owner_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid owner ID',
        });
      }
      
      const salles = await salleService.getSallesByOwnerId(owner_id);
      
      res.status(200).json({
        success: true,
        data: salles,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching salles',
        error: error.message,
      });
    }
  }

  async getByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status.toUpperCase() as PrismaSalleStatus;
      
      if (!Object.values(PrismaSalleStatus).includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status',
        });
      }
      
      const salles = await salleService.getSallesByStatus(status);
      
      res.status(200).json({
        success: true,
        data: salles,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching salles',
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
          message: 'Invalid salle ID',
        });
      }
      
      const salleData: UpdateSalleInput = req.body;
      const salle = await salleService.updateSalle(id, salleData);
      
      res.status(200).json({
        success: true,
        message: 'Salle updated successfully',
        data: salle,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating salle',
        error: error.message,
      });
    }
  }

  async approve(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid salle ID',
        });
      }
      
      const approvalData: ApproveSalleInput = req.body;
      const salle = await salleService.approveSalle(id, approvalData);
      
      res.status(200).json({
        success: true,
        message: 'Salle approval status updated successfully',
        data: salle,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error approving salle',
        error: error.message,
      });
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid salle ID',
        });
      }
      
      const salle = await salleService.activateSalle(id);
      
      res.status(200).json({
        success: true,
        message: 'Salle activated successfully',
        data: salle,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error activating salle',
        error: error.message,
      });
    }
  }

  async deactivate(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid salle ID',
        });
      }
      
      const salle = await salleService.deactivateSalle(id);
      
      res.status(200).json({
        success: true,
        message: 'Salle deactivated successfully',
        data: salle,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deactivating salle',
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
          message: 'Invalid salle ID',
        });
      }
      
      await salleService.deleteSalle(id);
      
      res.status(200).json({
        success: true,
        message: 'Salle deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting salle',
        error: error.message,
      });
    }
  }
}

export default new SalleController();