import { PrismaClient } from '@prisma/client';
import { AwardBadgeInput } from '../models/BadgeRule.interface';
import badgeRuleService from './BadgeRule.service';

const prisma = new PrismaClient();

export class UserBadgeService {
  // Attribuer un badge manuellement (Admin)
  async awardBadge(data: AwardBadgeInput) {
    // Vérifier si l'utilisateur a déjà le badge
    const existing = await prisma.userBadge.findUnique({
      where: {
        user_id_badge_id: {
          user_id: data.user_id,
          badge_id: data.badge_id,
        },
      },
    });

    if (existing) {
      throw new Error('User already has this badge');
    }

    return await prisma.userBadge.create({
      data: {
        user_id: data.user_id,
        badge_id: data.badge_id,
        awarded_by: data.awarded_by,
      },
      include: {
        badge: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        awarder: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  // Attribuer automatiquement les badges éligibles
  async autoAwardBadges(user_id: number) {
    const eligibleBadges = await badgeRuleService.checkUserEligibility(user_id);
    
    const awarded = [];
    for (const badge_id of eligibleBadges) {
      try {
        const userBadge = await this.awardBadge({ user_id, badge_id });
        awarded.push(userBadge);
      } catch (error) {
        // Badge déjà attribué, ignorer
      }
    }

    return awarded;
  }

  // Récupérer les badges d'un utilisateur
  async getUserBadges(user_id: number) {
    return await prisma.userBadge.findMany({
      where: { user_id },
      include: {
        badge: true,
        awarder: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        awarded_at: 'desc',
      },
    });
  }

  // Récupérer les utilisateurs ayant un badge
  async getUsersByBadge(badge_id: number) {
    return await prisma.userBadge.findMany({
      where: { badge_id },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            profile_picture_url: true,
            player_score: true,
          },
        },
        badge: true,
      },
      orderBy: {
        awarded_at: 'desc',
      },
    });
  }

  // Retirer un badge (Admin)
  async revokeBadge(user_id: number, badge_id: number) {
    return await prisma.userBadge.delete({
      where: {
        user_id_badge_id: {
          user_id,
          badge_id,
        },
      },
    });
  }

  // Statistiques badges utilisateur
  async getUserBadgeStats(user_id: number) {
    const badges = await prisma.userBadge.findMany({
      where: { user_id },
      include: {
        badge: {
          select: {
            badge_type: true,
          },
        },
      },
    });

    const byType = badges.reduce((acc: any, ub) => {
      const type = ub.badge.badge_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalBadges: badges.length,
      byType,
      recentBadges: badges.slice(0, 5),
    };
  }

  // Classement des utilisateurs par nombre de badges
  async getLeaderboard(limit: number = 10) {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            user_badges: true,
          },
        },
      },
      orderBy: [
        {
          user_badges: {
            _count: 'desc',
          },
        },
        {
          player_score: 'desc',
        },
      ],
      take: limit,
      where: {
        is_active: true,
        role: 'CLIENT',
      },
    });

    return users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture_url: user.profile_picture_url,
      player_score: user.player_score,
      badges_count: user._count.user_badges,
    }));
  }
}

export default new UserBadgeService();