import { Request, Response } from 'express';
import authService from '../services/Auth.service';
import { LoginInput, RegisterInput } from '../models/Auth.interface';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data: RegisterInput = req.body;
      const result = await authService.register(data);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Registration failed',
        error: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginInput = req.body;
      const result = await authService.login(data);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: 'Login failed',
        error: error.message,
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const profile = await authService.getProfile(req.user.userId);
      
      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        error: error.message,
      });
    }
  }
}

export default new AuthController();