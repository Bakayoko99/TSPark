import { PrismaClient, DefiStatus as PrismaDefiStatus, DifficultyLevel as PrismaDifficultyLevel } from '@prisma/client';
import { CreateDefiInput, UpdateDefiInput } from '../models/Defi.interface';

const prisma = new PrismaClient();

export class DefiService {
  async createDefi(data: CreateDefiInput & { creator_id: number }) {
    return await prisma.defi.create({
      data: {
        creator_id: data.creator_id,
        gym_id: data.gym_id,
        title: data.title,
        description: data.description,
        difficulty_level: data.difficulty_level as PrismaDifficultyLevel,
        duration_days: data.duration_days,
        start_date: data.start_date,
        end_date: data.end_date,
        is_collaborative: data.is_collaborative ?? false,
        target_calories: data.target_calories,
        status: (data.status as PrismaDefiStatus) ?? PrismaDefiStatus.DRAFT,
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

  async getAllDefis() {
    return await prisma.defi.findMany({
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
        created_at: 'desc',
      },
    });
  }

  async getDefiById(id: number) {
    return await prisma.defi.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            profile_picture_url: true,
          },
        },
        gym: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            postal_code: true,
          },
        },
      },
    });
  }

  async getDefisByCreatorId(creator_id: number) {
    return await prisma.defi.findMany({
      where: { creator_id },
      include: {
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getDefisByGymId(gym_id: number) {
    return await prisma.defi.findMany({
      where: { gym_id },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getDefisByStatus(status: PrismaDefiStatus) {
    return await prisma.defi.findMany({
      where: { status },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
        created_at: 'desc',
      },
    });
  }

  async getDefisByDifficulty(difficulty_level: PrismaDifficultyLevel) {
    return await prisma.defi.findMany({
      where: { difficulty_level },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
        created_at: 'desc',
      },
    });
  }

  async searchDefisByTitle(searchTerm: string) {
    return await prisma.defi.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
        created_at: 'desc',
      },
    });
  }

  async getActiveDefis() {
    return await prisma.defi.findMany({
      where: {
        status: PrismaDefiStatus.ACTIVE,
        start_date: {
          lte: new Date(),
        },
        OR: [
          { end_date: null },
          {
            end_date: {
              gte: new Date(),
            },
          },
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
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        start_date: 'asc',
      },
    });
  }

  async getCollaborativeDefis() {
    return await prisma.defi.findMany({
      where: { is_collaborative: true },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
        created_at: 'desc',
      },
    });
  }

  async updateDefi(id: number, data: UpdateDefiInput) {
    const updateData: any = { ...data };

    if (data.difficulty_level) {
      updateData.difficulty_level = data.difficulty_level as PrismaDifficultyLevel;
    }

    if (data.status) {
      updateData.status = data.status as PrismaDefiStatus;
    }

    return await prisma.defi.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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

  async updateDefiStatus(id: number, status: PrismaDefiStatus) {
    return await prisma.defi.update({
      where: { id },
      data: { status },
      include: {
        creator: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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

  async deleteDefi(id: number) {
    return await prisma.defi.delete({
      where: { id },
    });
  }

  async getDefisStats() {
    const total = await prisma.defi.count();

    const byStatus = await prisma.defi.groupBy({
      by: ['status'],
      _count: true,
    });

    const byDifficulty = await prisma.defi.groupBy({
      by: ['difficulty_level'],
      _count: true,
    });

    const collaborative = await prisma.defi.count({
      where: { is_collaborative: true },
    });

    const withGym = await prisma.defi.count({
      where: { gym_id: { not: null } },
    });

    return {
      total,
      byStatus: byStatus.map(item => ({
        status: item.status,
        count: item._count,
      })),
      byDifficulty: byDifficulty.map(item => ({
        level: item.difficulty_level,
        count: item._count,
      })),
      collaborative,
      withGym,
      individual: total - collaborative,
    };
  }
}

export default new DefiService();