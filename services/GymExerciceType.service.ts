import { PrismaClient } from '@prisma/client';
import { CreateGymExerciceTypeInput } from '../models/GymExerciceType.interface';

const prisma = new PrismaClient();

export class GymExerciceTypeService {
  async addExerciceTypeToGym(data: CreateGymExerciceTypeInput) {
    return await prisma.gymExerciceType.create({
      data,
      include: {
        exercice_type: true,
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

  async addMultipleExerciceTypesToGym(gym_id: number, exercice_type_ids: number[]) {
    const data = exercice_type_ids.map(exercice_type_id => ({
      gym_id,
      exercice_type_id,
    }));

    return await prisma.gymExerciceType.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async getExerciceTypesByGymId(gym_id: number) {
    return await prisma.gymExerciceType.findMany({
      where: { gym_id },
      include: {
        exercice_type: true,
      },
      orderBy: {
        exercice_type: {
          name: 'asc',
        },
      },
    });
  }

  async getGymsByExerciceTypeId(exercice_type_id: number) {
    return await prisma.gymExerciceType.findMany({
      where: { exercice_type_id },
      include: {
        gym: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            postal_code: true,
            contact_phone: true,
            contact_email: true,
            status: true,
            capacity: true,
          },
        },
      },
      orderBy: {
        gym: {
          name: 'asc',
        },
      },
    });
  }

  async getGymExerciceTypeById(id: number) {
    return await prisma.gymExerciceType.findUnique({
      where: { id },
      include: {
        exercice_type: true,
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

  async getGymExerciceTypeByIds(gym_id: number, exercice_type_id: number) {
    return await prisma.gymExerciceType.findUnique({
      where: {
        gym_id_exercice_type_id: {
          gym_id,
          exercice_type_id,
        },
      },
      include: {
        exercice_type: true,
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

  async exerciceTypeExistsInGym(gym_id: number, exercice_type_id: number): Promise<boolean> {
    const exists = await prisma.gymExerciceType.findUnique({
      where: {
        gym_id_exercice_type_id: {
          gym_id,
          exercice_type_id,
        },
      },
    });
    return !!exists;
  }

  async deleteGymExerciceType(id: number) {
    return await prisma.gymExerciceType.delete({
      where: { id },
    });
  }

  async deleteAllGymExerciceTypes(gym_id: number) {
    return await prisma.gymExerciceType.deleteMany({
      where: { gym_id },
    });
  }

  async countExerciceTypesByGymId(gym_id: number) {
    return await prisma.gymExerciceType.count({
      where: { gym_id },
    });
  }

  async getExerciceTypesByGymIdAndDifficulty(gym_id: number, difficulty_level: string) {
    return await prisma.gymExerciceType.findMany({
      where: {
        gym_id,
        exercice_type: {
          difficulty_level: difficulty_level as any,
        },
      },
      include: {
        exercice_type: true,
      },
      orderBy: {
        exercice_type: {
          name: 'asc',
        },
      },
    });
  }

  async getGymExerciceTypeStats(gym_id: number) {
    const total = await this.countExerciceTypesByGymId(gym_id);

    const byDifficulty = await prisma.gymExerciceType.groupBy({
      by: ['gym_id'],
      where: { gym_id },
      _count: true,
    });

    const exerciceTypes = await prisma.gymExerciceType.findMany({
      where: { gym_id },
      include: {
        exercice_type: {
          select: {
            difficulty_level: true,
            calories_per_hour: true,
          },
        },
      },
    });

    const difficultyCount = exerciceTypes.reduce((acc: any, item) => {
      const level = item.exercice_type.difficulty_level;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    const avgCalories = exerciceTypes.length > 0
      ? exerciceTypes.reduce((sum, item) => sum + item.exercice_type.calories_per_hour, 0) / exerciceTypes.length
      : 0;

    return {
      total,
      byDifficulty: Object.entries(difficultyCount).map(([level, count]) => ({
        level,
        count,
      })),
      averageCaloriesPerHour: Math.round(avgCalories),
    };
  }
}

export default new GymExerciceTypeService();