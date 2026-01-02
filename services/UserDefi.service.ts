import { PrismaClient, UserDefiStatus as PrismaUserDefiStatus } from '@prisma/client';
import { UpdateProgressInput } from '../models/UserDefi.interface';

const prisma = new PrismaClient();

export class UserDefiService {
  async joinDefi(user_id: number, challenge_id: number) {
    const existing = await prisma.userDefi.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
    });

    if (existing) {
      throw new Error('You are already participating in this challenge');
    }

    const defi = await prisma.defi.findUnique({
      where: { id: challenge_id },
      select: { status: true, title: true },
    });

    if (!defi) {
      throw new Error('Challenge not found');
    }

    if (defi.status !== 'ACTIVE') {
      throw new Error('This challenge is not active');
    }

    return await prisma.userDefi.create({
      data: {
        user_id,
        challenge_id,
        status: PrismaUserDefiStatus.ACCEPTED,
        progress_percentage: 0,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
            duration_days: true,
          },
        },
      },
    });
  }

  async inviteUser(user_id: number, challenge_id: number) {
    const existing = await prisma.userDefi.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
    });

    if (existing) {
      throw new Error('User is already invited or participating');
    }

    return await prisma.userDefi.create({
      data: {
        user_id,
        challenge_id,
        status: PrismaUserDefiStatus.INVITED,
        progress_percentage: 0,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async inviteMultipleUsers(challenge_id: number, user_ids: number[]) {
    const operations = user_ids.map((user_id) =>
      prisma.userDefi.create({
        data: {
          user_id,
          challenge_id,
          status: PrismaUserDefiStatus.INVITED,
          progress_percentage: 0,
        },
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      })
    );

    return await prisma.$transaction(operations);
  }

  async acceptInvitation(user_id: number, challenge_id: number) {
    return await prisma.userDefi.update({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
      data: {
        status: PrismaUserDefiStatus.ACCEPTED,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async startDefi(user_id: number, challenge_id: number) {
    return await prisma.userDefi.update({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
      data: {
        status: PrismaUserDefiStatus.IN_PROGRESS,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async updateProgress(user_id: number, challenge_id: number, data: UpdateProgressInput) {
    const updateData: any = {
      progress_percentage: data.progress_percentage,
    };

    if (data.progress_percentage >= 100) {
      updateData.status = PrismaUserDefiStatus.COMPLETED;
      updateData.completed_at = new Date();
    } else if (data.status) {
      updateData.status = data.status as PrismaUserDefiStatus;
    }

    return await prisma.userDefi.update({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
      data: updateData,
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async abandonDefi(user_id: number, challenge_id: number) {
    return await prisma.userDefi.update({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
      data: {
        status: PrismaUserDefiStatus.ABANDONED,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async getUserDefis(user_id: number) {
    return await prisma.userDefi.findMany({
      where: { user_id },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
            duration_days: true,
            status: true,
            is_collaborative: true,
            creator: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        joined_at: 'desc',
      },
    });
  }

  async getUserDefisByStatus(user_id: number, status: PrismaUserDefiStatus) {
    return await prisma.userDefi.findMany({
      where: {
        user_id,
        status,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
            duration_days: true,
          },
        },
      },
      orderBy: {
        joined_at: 'desc',
      },
    });
  }

  async getDefiParticipants(challenge_id: number) {
    return await prisma.userDefi.findMany({
      where: { challenge_id },
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
      },
      orderBy: {
        progress_percentage: 'desc',
      },
    });
  }

  async getParticipation(user_id: number, challenge_id: number) {
    return await prisma.userDefi.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
            duration_days: true,
          },
        },
      },
    });
  }

  async countParticipants(challenge_id: number) {
    return await prisma.userDefi.count({
      where: { challenge_id },
    });
  }

  async countActiveParticipants(challenge_id: number) {
    return await prisma.userDefi.count({
      where: {
        challenge_id,
        status: {
          in: [PrismaUserDefiStatus.ACCEPTED, PrismaUserDefiStatus.IN_PROGRESS],
        },
      },
    });
  }

  async getLeaderboard(challenge_id: number) {
    return await prisma.userDefi.findMany({
      where: {
        challenge_id,
        status: {
          in: [PrismaUserDefiStatus.IN_PROGRESS, PrismaUserDefiStatus.COMPLETED],
        },
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_picture_url: true,
            player_score: true,
          },
        },
      },
      orderBy: [
        { progress_percentage: 'desc' },
        { completed_at: 'asc' },
      ],
      take: 100,
    });
  }

  async leaveDefi(user_id: number, challenge_id: number) {
    return await prisma.userDefi.delete({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
    });
  }

  async getUserStats(user_id: number) {
    const total = await prisma.userDefi.count({
      where: { user_id },
    });

    const completed = await prisma.userDefi.count({
      where: {
        user_id,
        status: PrismaUserDefiStatus.COMPLETED,
      },
    });

    const inProgress = await prisma.userDefi.count({
      where: {
        user_id,
        status: PrismaUserDefiStatus.IN_PROGRESS,
      },
    });

    const abandoned = await prisma.userDefi.count({
      where: {
        user_id,
        status: PrismaUserDefiStatus.ABANDONED,
      },
    });

    const avgProgress = await prisma.userDefi.aggregate({
      where: {
        user_id,
        status: {
          in: [PrismaUserDefiStatus.IN_PROGRESS, PrismaUserDefiStatus.COMPLETED],
        },
      },
      _avg: {
        progress_percentage: true,
      },
    });

    return {
      total,
      completed,
      inProgress,
      abandoned,
      averageProgress: avgProgress._avg.progress_percentage || 0,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  }

  async getDefiStats(challenge_id: number) {
    const total = await prisma.userDefi.count({
      where: { challenge_id },
    });

    const byStatus = await prisma.userDefi.groupBy({
      by: ['status'],
      where: { challenge_id },
      _count: true,
    });

    const avgProgress = await prisma.userDefi.aggregate({
      where: { challenge_id },
      _avg: {
        progress_percentage: true,
      },
    });

    return {
      totalParticipants: total,
      byStatus: byStatus.map(item => ({
        status: item.status,
        count: item._count,
      })),
      averageProgress: avgProgress._avg.progress_percentage || 0,
    };
  }
}

export default new UserDefiService();