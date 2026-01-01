import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Role } from '../models/User.interface';

const prisma = new PrismaClient();

// Vérifier que le gym_id appartient au propriétaire connecté (sauf pour ADMIN)
export const verifyGymOwnership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Si c'est un ADMIN, il peut tout gérer
    if (req.user.role === Role.ADMIN) {
      return next();
    }

    // Récupérer le gym_id depuis body ou params
    const gym_id = parseInt(req.body.gym_id || req.params.gym_id);

    if (isNaN(gym_id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid gym ID',
      });
    }

    // Vérifier que la salle existe et appartient au propriétaire
    const gym = await prisma.salle.findUnique({
      where: { id: gym_id },
      select: { owner_id: true, name: true },
    });

    if (!gym) {
      return res.status(404).json({
        success: false,
        message: 'Gym not found',
      });
    }

    // Vérifier que le propriétaire connecté est bien le propriétaire de la salle
    if (gym.owner_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only manage your own gyms.',
        gym_owner_id: gym.owner_id,
        your_user_id: req.user.userId,
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying gym ownership',
      error: error.message,
    });
  }
};

// Vérifier la propriété pour la suppression par ID de gym_exercice_type
export const verifyGymExerciceTypeOwnership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Si c'est un ADMIN, il peut tout gérer
    if (req.user.role === Role.ADMIN) {
      return next();
    }

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid gym exercice type ID',
      });
    }

    // Récupérer le gym_exercice_type avec les infos de la salle
    const gymExerciceType = await prisma.gymExerciceType.findUnique({
      where: { id },
      include: {
        gym: {
          select: { owner_id: true },
        },
      },
    });

    if (!gymExerciceType) {
      return res.status(404).json({
        success: false,
        message: 'Gym exercice type not found',
      });
    }

    // Vérifier que le propriétaire connecté est bien le propriétaire de la salle
    if (gymExerciceType.gym.owner_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only manage your own gyms.',
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying gym exercice type ownership',
      error: error.message,
    });
  }
};