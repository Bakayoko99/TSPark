import { PrismaClient } from '@prisma/client';
import { CreateBadgeInput, UpdateBadgeInput, BadgeType } from '../models/Badge.interface';

const prisma = new PrismaClient();

export class BadgeService {
  // Créer un badge (Admin uniquement)
  async create(data: CreateBadgeInput, created_by: number) {
    // Vérifier si le nom existe déjà
    const existing = await prisma.badge.findFirst({
      where: { name: data.name },
    });

    if (existing) {
      throw new Error('A badge with this name already exists');
    }

    return await prisma.badge.create({
      data: {
        name: data.name,
        description: data.description,
        image_url: data.image_url,
        badge_type: data.badge_type,
        created_by,
      },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });
  }

  // Récupérer tous les badges
  async getAll() {
    return await prisma.badge.findMany({
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Récupérer un badge par ID
  async getById(id: number) {
    return await prisma.badge.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
    });
  }

  // Récupérer badges par type
  async getByType(badge_type: BadgeType) {
    return await prisma.badge.findMany({
      where: { badge_type: badge_type as any },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Rechercher des badges
  async search(query: string) {
    return await prisma.badge.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
    });
  }

  // Statistiques des badges
  async getStats() {
    const totalBadges = await prisma.badge.count();
    
    const byType = await prisma.badge.groupBy({
      by: ['badge_type'],
      _count: {
        id: true,
      },
    });

    const mostAwarded = await prisma.badge.findMany({
      take: 5,
      include: {
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
      orderBy: {
        user_badges: {
          _count: 'desc',
        },
      },
    });

    const totalAwarded = await prisma.userBadge.count();

    return {
      totalBadges,
      totalAwarded,
      byType: byType.reduce((acc: any, item) => {
        acc[item.badge_type] = item._count.id;
        return acc;
      }, {}),
      mostAwarded: mostAwarded.map(badge => ({
        id: badge.id,
        name: badge.name,
        image_url: badge.image_url,
        timesAwarded: badge._count.user_badges,
      })),
    };
  }

  // Récupérer badges créés par un admin
  async getByCreator(created_by: number) {
    return await prisma.badge.findMany({
      where: { created_by },
      include: {
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Mettre à jour un badge (Admin uniquement)
  async update(id: number, data: UpdateBadgeInput) {
    // Si le nom change, vérifier qu'il n'existe pas déjà
    if (data.name) {
      const existing = await prisma.badge.findFirst({
        where: {
          name: data.name,
          NOT: { id },
        },
      });

      if (existing) {
        throw new Error('A badge with this name already exists');
      }
    }

    return await prisma.badge.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image_url: data.image_url,
        badge_type: data.badge_type,
      },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  // Supprimer un badge (Admin uniquement)
  async delete(id: number) {
    // Vérifier si le badge est attribué à des utilisateurs
    const userBadgesCount = await prisma.userBadge.count({
      where: { badge_id: id },
    });

    if (userBadgesCount > 0) {
      throw new Error(`Cannot delete badge: it has been awarded to ${userBadgesCount} user(s)`);
    }

    return await prisma.badge.delete({
      where: { id },
    });
  }

  // Compter les utilisateurs ayant un badge
  async countUsersWithBadge(id: number) {
    return await prisma.userBadge.count({
      where: { badge_id: id },
    });
  }

  // Vérifier si un badge existe
  async exists(id: number): Promise<boolean> {
    const badge = await prisma.badge.findUnique({
      where: { id },
      select: { id: true },
    });
    return badge !== null;
  }
}

export default new BadgeService();