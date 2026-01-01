import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../models/Auth.interface';
import { Role } from '../models/User.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required',
      });
    }

    const token = authHeader.substring(7); 

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
    }

    next();
  };
};

export const isAdmin = authorize(Role.ADMIN);

// Middleware pour vérifier si c'est un ADMIN ou GYM_OWNER
export const isAdminOrGymOwner = authorize(Role.ADMIN, Role.GYM_OWNER);

// Middleware pour vérifier si c'est le propriétaire ou un ADMIN
export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  // Si c'est un admin, il peut tout faire
  if (req.user.role === Role.ADMIN) {
    return next();
  }

  // Sinon, vérifier si c'est le propriétaire
  const resourceOwnerId = parseInt(req.params.owner_id || req.body.owner_id);
  
  if (req.user.userId !== resourceOwnerId) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only manage your own resources.',
    });
  }

  next();
};