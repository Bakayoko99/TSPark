import { PrismaClient } from '@prisma/client';
import { CreateBadgeRuleInput, UpdateBadgeRuleInput, BadgeRuleType } from '../models/BadgeRule.interface';

const prisma = new PrismaClient();

export class BadgeRuleService {
  // Créer une règle de badge
  async create(data: CreateBadgeRuleInput) {
    // Vérifier si le badge existe
    const badge = await prisma.badge.findUnique({
      where: { id: data.badge_id },
    });

    if (!badge) {
      throw new Error('Badge not found');
    }

    return await prisma.badgeRule.create({
      data: {
        badge_id: data.badge_id,
        rule_type: data.rule_type,
        rule_config: data.rule_config as any,
      },
      include: {
        badge: {
          select: {
            id: true,
            name: true,
            badge_type: true,
          },
        },
      },
    });
  }

  // Récupérer toutes les règles
  async getAll() {
    return await prisma.badgeRule.findMany({
      include: {
        badge: {
          select: {
            id: true,
            name: true,
            description: true,
            image_url: true,
            badge_type: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Récupérer les règles d'un badge
  async getByBadgeId(badge_id: number) {
    return await prisma.badgeRule.findMany({
      where: { badge_id },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Récupérer une règle par ID
  async getById(id: number) {
    return await prisma.badgeRule.findUnique({
      where: { id },
      include: {
        badge: true,
      },
    });
  }

  // Mettre à jour une règle
  async update(id: number, data: UpdateBadgeRuleInput) {
    return await prisma.badgeRule.update({
      where: { id },
      data: {
        rule_type: data.rule_type,
        rule_config: data.rule_config as any,
        is_active: data.is_active,
      },
      include: {
        badge: true,
      },
    });
  }

  // Supprimer une règle
  async delete(id: number) {
    return await prisma.badgeRule.delete({
      where: { id },
    });
  }

  // Activer/Désactiver une règle
  async toggleActive(id: number) {
    const rule = await prisma.badgeRule.findUnique({
      where: { id },
    });

    if (!rule) {
      throw new Error('Rule not found');
    }

    return await prisma.badgeRule.update({
      where: { id },
      data: {
        is_active: !rule.is_active,
      },
    });
  }

  // Vérifier les règles pour un utilisateur (automatique)
  async checkUserEligibility(user_id: number) {
    const activeRules = await prisma.badgeRule.findMany({
      where: { is_active: true },
      include: {
        badge: {
          include: {
            user_badges: {
              where: { user_id },
            },
          },
        },
      },
    });

    const eligibleBadges: number[] = [];

    for (const rule of activeRules) {
      // Skip si l'utilisateur a déjà le badge
      if (rule.badge.user_badges.length > 0) continue;

      const isEligible = await this.evaluateRule(user_id, rule);
      if (isEligible) {
        eligibleBadges.push(rule.badge_id);
      }
    }

    return eligibleBadges;
  }

  // Évaluer une règle pour un utilisateur
  private async evaluateRule(user_id: number, rule: any): Promise<boolean> {
    const config = rule.rule_config;

    switch (rule.rule_type) {
      case BadgeRuleType.CHALLENGE_COMPLETED:
        return await this.checkChallengeCompleted(user_id, config.challenge_id);

      case BadgeRuleType.CHALLENGES_COUNT:
        return await this.checkChallengesCount(user_id, config.count, config.difficulty_level);

      case BadgeRuleType.CONSECUTIVE_DAYS:
        return await this.checkConsecutiveDays(user_id, config.days);

      case BadgeRuleType.TOTAL_SESSIONS:
        return await this.checkTotalSessions(user_id, config.sessions_count);

      case BadgeRuleType.TOTAL_CALORIES:
        return await this.checkTotalCalories(user_id, config.calories);

      case BadgeRuleType.TOTAL_WEIGHT_LIFTED:
        return await this.checkTotalWeightLifted(user_id, config.weight_kg);

      case BadgeRuleType.SPECIFIC_EXERCISE:
        return await this.checkSpecificExercise(user_id, config.exercise_type_id, config.repetitions);

      case BadgeRuleType.PLAYER_SCORE:
        return await this.checkPlayerScore(user_id, config.score);

      default:
        return false;
    }
  }

  // Règles de vérification
  private async checkChallengeCompleted(user_id: number, challenge_id: number): Promise<boolean> {
    const completion = await prisma.userDefi.findFirst({
      where: {
        user_id,
        challenge_id,
        status: 'COMPLETED',
      },
    });
    return completion !== null;
  }

  private async checkChallengesCount(user_id: number, count: number, difficulty_level?: string): Promise<boolean> {
    const where: any = {
      user_id,
      status: 'COMPLETED',
    };

    if (difficulty_level) {
      where.challenge = {
        difficulty_level,
      };
    }

    const completedCount = await prisma.userDefi.count({ where });
    return completedCount >= count;
  }

  private async checkConsecutiveDays(user_id: number, days: number): Promise<boolean> {
    const sessions = await prisma.workoutSession.findMany({
      where: { user_id },
      orderBy: { session_date: 'desc' },
      select: { session_date: true },
    });

    if (sessions.length === 0) return false;

    let consecutiveDays = 1;
    for (let i = 0; i < sessions.length - 1; i++) {
      const diff = Math.abs(
        new Date(sessions[i].session_date).getTime() - 
        new Date(sessions[i + 1].session_date).getTime()
      ) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        consecutiveDays++;
      } else if (diff > 1) {
        break;
      }
    }

    return consecutiveDays >= days;
  }

  private async checkTotalSessions(user_id: number, sessions_count: number): Promise<boolean> {
    const count = await prisma.workoutSession.count({
      where: { user_id },
    });
    return count >= sessions_count;
  }

  private async checkTotalCalories(user_id: number, calories: number): Promise<boolean> {
    const result = await prisma.workoutSession.aggregate({
      where: { user_id },
      _sum: {
        calories_burned: true,
      },
    });
    return (result._sum.calories_burned || 0) >= calories;
  }

  private async checkTotalWeightLifted(user_id: number, weight_kg: number): Promise<boolean> {
    const result = await prisma.workoutExercice.aggregate({
      where: {
        workout_session: {
          user_id,
        },
      },
      _sum: {
        weight_kg: true,
      },
    });
    return Number(result._sum.weight_kg || 0) >= weight_kg;
  }

  private async checkSpecificExercise(user_id: number, exercise_type_id: number, repetitions: number): Promise<boolean> {
    const result = await prisma.workoutExercice.aggregate({
      where: {
        exercise_type_id,
        workout_session: {
          user_id,
        },
      },
      _sum: {
        repetitions: true,
      },
    });
    return (result._sum.repetitions || 0) >= repetitions;
  }

  private async checkPlayerScore(user_id: number, score: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: { player_score: true },
    });
    return (user?.player_score || 0) >= score;
  }
}

export default new BadgeRuleService();