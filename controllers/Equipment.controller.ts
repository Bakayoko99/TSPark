import { Request, Response } from 'express';
import equipmentService from '../services/Equipment.service';
import { CreateEquipmentInput, UpdateEquipmentInput } from '../models/Equipment.interface';

export class EquipmentController {
  async create(req: Request, res: Response) {
    try {
      const equipmentData: CreateEquipmentInput = req.body;
      const equipment = await equipmentService.createEquipment(equipmentData);
      res.status(201).json({
        success: true,
        message: 'Equipment created successfully',
        data: equipment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating equipment',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const equipments = await equipmentService.getAllEquipments();
      res.status(200).json({
        success: true,
        data: equipments,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching equipments',
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
          message: 'Invalid equipment ID',
        });
      }
      
      const equipment = await equipmentService.getEquipmentById(id);
      
      if (!equipment) {
        return res.status(404).json({
          success: false,
          message: 'Equipment not found',
        });
      }

      res.status(200).json({
        success: true,
        data: equipment,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching equipment',
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
      
      const equipments = await equipmentService.searchEquipmentsByName(q);
      
      res.status(200).json({
        success: true,
        data: equipments,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error searching equipments',
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
          message: 'Invalid equipment ID',
        });
      }
      
      const equipmentData: UpdateEquipmentInput = req.body;
      const equipment = await equipmentService.updateEquipment(id, equipmentData);
      
      res.status(200).json({
        success: true,
        message: 'Equipment updated successfully',
        data: equipment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating equipment',
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
          message: 'Invalid equipment ID',
        });
      }
      
      await equipmentService.deleteEquipment(id);
      
      res.status(200).json({
        success: true,
        message: 'Equipment deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting equipment',
        error: error.message,
      });
    }
  }
}

export default new EquipmentController();