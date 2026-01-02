import { PrismaClient } from '@prisma/client';
import { CreateWorkoutSessionInput, UpdateWorkoutSessionInput, WorkoutSessionFilters } from '../models/WorkoutSession.interface';

const prisma = new PrismaClient();

export class WorkoutSessionService {
  async createSession(data: CreateWorkoutSessionInput & { user_id: number }) {
    return await prisma.workoutSession.create({
      data: {
        user_id: data.user_id,
        challenge_id: data.challenge_id,
        gym_id: data.gym_id,
        session_date: data.session_date,
        duration_minutes: data.duration_minutes,
        calories_burned: data.calories_burned,
        notes: data.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty_level: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  async getAllSessions() {
    return await prisma.workoutSession.findMany({
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getSessionById(id: number) {
    return await prisma.workoutSession.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            profile_picture_url: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
      },
    });
  }

  async getSessionsByUserId(user_id: number) {
    return await prisma.workoutSession.findMany({
      where: { user_id },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty_level: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getSessionsByChallengeId(challenge_id: number) {
    return await prisma.workoutSession.findMany({
      where: { challenge_id },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_picture_url: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getSessionsByGymId(gym_id: number) {
    return await prisma.workoutSession.findMany({
      where: { gym_id },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async searchSessions(filters: WorkoutSessionFilters) {
    const where: any = {};

    if (filters.user_id) where.user_id = filters.user_id;
    if (filters.challenge_id) where.challenge_id = filters.challenge_id;
    if (filters.gym_id) where.gym_id = filters.gym_id;

    if (filters.start_date || filters.end_date) {
      where.session_date = {};
      if (filters.start_date) where.session_date.gte = filters.start_date;
      if (filters.end_date) where.session_date.lte = filters.end_date;
    }

    if (filters.min_duration || filters.max_duration) {
      where.duration_minutes = {};
      if (filters.min_duration) where.duration_minutes.gte = filters.min_duration;
      if (filters.max_duration) where.duration_minutes.lte = filters.max_duration;
    }

    if (filters.min_calories || filters.max_calories) {
      where.calories_burned = {};
      if (filters.min_calories) where.calories_burned.gte = filters.min_calories;
      if (filters.max_calories) where.calories_burned.lte = filters.max_calories;
    }

    return await prisma.workoutSession.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getTodaySessions(user_id?: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const where: any = {
      session_date: {
        gte: today,
        lt: tomorrow,
      },
    };

    if (user_id) where.user_id = user_id;

    return await prisma.workoutSession.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getWeeklySessions(user_id?: number) {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const where: any = {
      session_date: {
        gte: weekAgo,
        lte: today,
      },
    };

    if (user_id) where.user_id = user_id;

    return await prisma.workoutSession.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async getMonthlySessions(user_id?: number) {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const where: any = {
      session_date: {
        gte: monthAgo,
        lte: today,
      },
    };

    if (user_id) where.user_id = user_id;

    return await prisma.workoutSession.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        session_date: 'desc',
      },
    });
  }

  async updateSession(id: number, data: UpdateWorkoutSessionInput) {
    return await prisma.workoutSession.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async deleteSession(id: number) {
    return await prisma.workoutSession.delete({
      where: { id },
    });
  }

  async countSessions(filters?: WorkoutSessionFilters) {
    const where: any = {};

    if (filters?.user_id) where.user_id = filters.user_id;
    if (filters?.challenge_id) where.challenge_id = filters.challenge_id;
    if (filters?.gym_id) where.gym_id = filters.gym_id;

    return await prisma.workoutSession.count({ where });
  }

  async getUserStats(user_id: number) {
    const sessions = await prisma.workoutSession.findMany({
      where: { user_id },
      select: {
        duration_minutes: true,
        calories_burned: true,
        session_date: true,
      },
    });

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    const totalCalories = sessions.reduce((sum, s) => sum + s.calories_burned, 0);
    const avgDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
    const avgCalories = totalSessions > 0 ? totalCalories / totalSessions : 0;

    const today = new Date();
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthSessions = sessions.filter(s => new Date(s.session_date) >= thisMonthStart);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeekSessions = sessions.filter(s => new Date(s.session_date) >= weekAgo);

    return {
      totalSessions,
      totalDuration,
      totalCalories,
      avgDuration: Math.round(avgDuration),
      avgCalories: Math.round(avgCalories),
      thisMonth: {
        sessions: thisMonthSessions.length,
        duration: thisMonthSessions.reduce((sum, s) => sum + s.duration_minutes, 0),
        calories: thisMonthSessions.reduce((sum, s) => sum + s.calories_burned, 0),
      },
      thisWeek: {
        sessions: thisWeekSessions.length,
        duration: thisWeekSessions.reduce((sum, s) => sum + s.duration_minutes, 0),
        calories: thisWeekSessions.reduce((sum, s) => sum + s.calories_burned, 0),
      },
    };
  }

  async getChallengeStats(challenge_id: number) {
    const sessions = await prisma.workoutSession.findMany({
      where: { challenge_id },
      select: {
        duration_minutes: true,
        calories_burned: true,
        user_id: true,
      },
    });

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    const totalCalories = sessions.reduce((sum, s) => sum + s.calories_burned, 0);
    const uniqueParticipants = new Set(sessions.map(s => s.user_id)).size;

    return {
      totalSessions,
      totalDuration,
      totalCalories,
      uniqueParticipants,
      avgSessionsPerUser: uniqueParticipants > 0 ? totalSessions / uniqueParticipants : 0,
    };
  }

  async getGymStats(gym_id: number) {
    const sessions = await prisma.workoutSession.findMany({
      where: { gym_id },
      select: {
        duration_minutes: true,
        calories_burned: true,
        user_id: true,
      },
    });

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    const totalCalories = sessions.reduce((sum, s) => sum + s.calories_burned, 0);
    const uniqueUsers = new Set(sessions.map(s => s.user_id)).size;

    return {
      totalSessions,
      totalDuration,
      totalCalories,
      uniqueUsers,
      avgSessionsPerUser: uniqueUsers > 0 ? totalSessions / uniqueUsers : 0,
    };
  }

  async getTopUsers(limit: number = 10) {
    const result = await prisma.workoutSession.groupBy({
      by: ['user_id'],
      _count: {
        id: true,
      },
      _sum: {
        duration_minutes: true,
        calories_burned: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });

    const userIds = result.map(r => r.user_id);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        profile_picture_url: true,
        player_score: true,
      },
    });

    return result.map(r => {
      const user = users.find(u => u.id === r.user_id);
      return {
        user,
        totalSessions: r._count.id,
        totalDuration: r._sum.duration_minutes || 0,
        totalCalories: r._sum.calories_burned || 0,
      };
    });
  }
}

export default new WorkoutSessionService();