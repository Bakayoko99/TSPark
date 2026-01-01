import { PrismaClient, DifficultyLevel as PrismaDifficultyLevel } from '@prisma/client';
import { CreateExerciceTypeInput, UpdateExerciceTypeInput } from '../models/ExerciceType.interface';

const prisma = new PrismaClient();

export class ExerciceTypeService {
  private formatTargetedMuscles(muscles: string | string[]): string {
    if (Array.isArray(muscles)) {
      return JSON.stringify(muscles);
    }
    return muscles;
  }

  async createExerciceType(data: CreateExerciceTypeInput) {
    return await prisma.exerciceType.create({
      data: {
        name: data.name,
        description: data.description,
        difficulty_level: data.difficulty_level.toUpperCase() as PrismaDifficultyLevel,
        targeted_muscles: this.formatTargetedMuscles(data.targeted_muscles),
        calories_per_hour: data.calories_per_hour,
      },
    });
  }

  async getAllExerciceTypes() {
    return await prisma.exerciceType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getExerciceTypeById(id: number) {
    return await prisma.exerciceType.findUnique({
      where: { id },
    });
  }

  async getExerciceTypesByDifficulty(difficulty_level: PrismaDifficultyLevel) {
    return await prisma.exerciceType.findMany({
      where: { difficulty_level },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async searchExerciceTypesByName(searchTerm: string) {
    return await prisma.exerciceType.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getExerciceTypesByCalories(minCalories: number) {
    return await prisma.exerciceType.findMany({
      where: {
        calories_per_hour: {
          gte: minCalories,
        },
      },
      orderBy: {
        calories_per_hour: 'desc',
      },
    });
  }

  async getExerciceTypesByCaloriesRange(minCalories: number, maxCalories: number) {
    return await prisma.exerciceType.findMany({
      where: {
        calories_per_hour: {
          gte: minCalories,
          lte: maxCalories,
        },
      },
      orderBy: {
        calories_per_hour: 'desc',
      },
    });
  }

  async updateExerciceType(id: number, data: UpdateExerciceTypeInput) {
    const updateData: any = { ...data };

    if (data.difficulty_level) {
      updateData.difficulty_level = data.difficulty_level.toUpperCase() as PrismaDifficultyLevel;
    }

    if (data.targeted_muscles) {
      updateData.targeted_muscles = this.formatTargetedMuscles(data.targeted_muscles);
    }

    return await prisma.exerciceType.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteExerciceType(id: number) {
    return await prisma.exerciceType.delete({
      where: { id },
    });
  }

  async getExerciceTypesStats() {
    const total = await prisma.exerciceType.count();
    
    const byDifficulty = await prisma.exerciceType.groupBy({
      by: ['difficulty_level'],
      _count: true,
    });

    const avgCalories = await prisma.exerciceType.aggregate({
      _avg: {
        calories_per_hour: true,
      },
      _max: {
        calories_per_hour: true,
      },
      _min: {
        calories_per_hour: true,
      },
    });

    return {
      total,
      byDifficulty: byDifficulty.map(item => ({
        level: item.difficulty_level,
        count: item._count,
      })),
      calories: {
        average: avgCalories._avg.calories_per_hour,
        max: avgCalories._max.calories_per_hour,
        min: avgCalories._min.calories_per_hour,
      },
    };
  }
}

export default new ExerciceTypeService();