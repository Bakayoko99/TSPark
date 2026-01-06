import { Request, Response } from 'express';
import userService from '../services/User.service';
import { CreateUserInput, UpdateUserInput } from '../models/User.interface';

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const userData: CreateUserInput = req.body;
      const user = await userService.createUser(userData);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error creating user',
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
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

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }
      
      const user = await userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
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
          message: 'Invalid user ID',
        });
      }
      
      const userData: UpdateUserInput = req.body;
      const user = await userService.updateUser(id, userData);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating user',
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
          message: 'Invalid user ID',
        });
      }
      
      await userService.deleteUser(id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deleting user',
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
          message: 'Invalid user ID',
        });
      }
      
      const user = await userService.deactivateUser(id);
      
      res.status(200).json({
        success: true,
        message: 'User deactivated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error deactivating user',
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
          message: 'Invalid user ID',
        });
      }
      
      const user = await userService.activateUser(id);
      
      res.status(200).json({
        success: true,
        message: 'User activated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error activating user',
        error: error.message,
      });
    }
  }

  async updateScore(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { score } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }
      
      if (typeof score !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'Score must be a number',
        });
      }
      
      const user = await userService.updatePlayerScore(id, score);
      
      res.status(200).json({
        success: true,
        message: 'Player score updated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error updating player score',
        error: error.message,
      });
    }
  }
}

export default new UserController();