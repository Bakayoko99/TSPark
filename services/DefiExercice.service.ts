import { PrismaClient } from '@prisma/client';
import { CreateDefiExerciceInput, UpdateDefiExerciceInput, BulkCreateDefiExerciceInput, ReorderDefiExerciceInput } from '../models/DefiExercice.interface';

const prisma = new PrismaClient();

export class DefiExerciceService {
  async addExerciceToDefi(data: CreateDefiExerciceInput) {
    const existing = await prisma.defiExercice.findUnique({
      where: {
        challenge_id_exercise_type_id: {
          challenge_id: data.challenge_id,
          exercise_type_id: data.exercise_type_id,
        },
      },
    });

    if (existing) {
      throw new Error('This exercise is already in this challenge');
    }

    return await prisma.defiExercice.create({
      data: {
        challenge_id: data.challenge_id,
        exercise_type_id: data.exercise_type_id,
        target_repetitions: data.target_repetitions,
        target_duration_minutes: data.target_duration_minutes,
        order_index: data.order_index,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty_level: true,
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty_level: true,
            targeted_muscles: true,
            calories_per_hour: true,
          },
        },
      },
    });
  }

  async addMultipleExercicesToDefi(data: BulkCreateDefiExerciceInput) {
    const operations = data.exercises.map((exercise) =>
      prisma.defiExercice.create({
        data: {
          challenge_id: data.challenge_id,
          exercise_type_id: exercise.exercise_type_id,
          target_repetitions: exercise.target_repetitions,
          target_duration_minutes: exercise.target_duration_minutes,
          order_index: exercise.order_index,
        },
        include: {
          exercise_type: {
            select: {
              id: true,
              name: true,
              difficulty_level: true,
              targeted_muscles: true,
              calories_per_hour: true,
            },
          },
        },
      })
    );

    return await prisma.$transaction(operations);
  }

  async getExercicesByDefiId(challenge_id: number) {
    return await prisma.defiExercice.findMany({
      where: { challenge_id },
      include: {
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty_level: true,
            targeted_muscles: true,
            calories_per_hour: true,
          },
        },
      },
      orderBy: {
        order_index: 'asc',
      },
    });
  }

  async getDefisByExerciceTypeId(exercise_type_id: number) {
    return await prisma.defiExercice.findMany({
      where: { exercise_type_id },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
            duration_days: true,
            status: true,
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
        challenge: {
          created_at: 'desc',
        },
      },
    });
  }

  async getById(id: number) {
    return await prisma.defiExercice.findUnique({
      where: { id },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty_level: true,
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty_level: true,
            targeted_muscles: true,
            calories_per_hour: true,
          },
        },
      },
    });
  }

  async getByDefiAndExerciceIds(challenge_id: number, exercise_type_id: number) {
    return await prisma.defiExercice.findUnique({
      where: {
        challenge_id_exercise_type_id: {
          challenge_id,
          exercise_type_id,
        },
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }

  async countExercicesByDefiId(challenge_id: number) {
    return await prisma.defiExercice.count({
      where: { challenge_id },
    });
  }

  async calculateTotalDuration(challenge_id: number) {
    const exercises = await prisma.defiExercice.findMany({
      where: { challenge_id },
      select: {
        target_duration_minutes: true,
      },
    });

    return exercises.reduce((sum, ex) => sum + (ex.target_duration_minutes || 0), 0);
  }

  async calculateTotalCalories(challenge_id: number) {
    const exercises = await prisma.defiExercice.findMany({
      where: { challenge_id },
      include: {
        exercise_type: {
          select: {
            calories_per_hour: true,
          },
        },
      },
    });

    const totalCalories = exercises.reduce((sum, exercise) => {
      const duration = exercise.target_duration_minutes || 0;
      // Convertir calories_per_hour en calories_per_minute
      const caloriesPerMinute = exercise.exercise_type.calories_per_hour / 60;
      return sum + duration * caloriesPerMinute;
    }, 0);

    return Math.round(totalCalories);
  }

  async reorderExercices(challenge_id: number, newOrder: ReorderDefiExerciceInput[]) {
    const operations = newOrder.map((item) =>
      prisma.defiExercice.update({
        where: { id: item.id },
        data: { order_index: item.order_index },
      })
    );

    return await prisma.$transaction(operations);
  }

  async update(id: number, data: UpdateDefiExerciceInput) {
    return await prisma.defiExercice.update({
      where: { id },
      data: {
        target_repetitions: data.target_repetitions,
        target_duration_minutes: data.target_duration_minutes,
        order_index: data.order_index,
      },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            difficulty_level: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return await prisma.defiExercice.delete({
      where: { id },
    });
  }

  async deleteAllByDefiId(challenge_id: number) {
    return await prisma.defiExercice.deleteMany({
      where: { challenge_id },
    });
  }

  async getStats(challenge_id: number) {
    const exercises = await prisma.defiExercice.findMany({
      where: { challenge_id },
      include: {
        exercise_type: {
          select: {
            difficulty_level: true,
            targeted_muscles: true,
            calories_per_hour: true,
          },
        },
      },
    });

    const totalExercises = exercises.length;
    const totalDuration = await this.calculateTotalDuration(challenge_id);
    const totalCalories = await this.calculateTotalCalories(challenge_id);

    const byDifficulty = exercises.reduce((acc: any, ex) => {
      const difficulty = ex.exercise_type.difficulty_level;
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {});

    const musclesTargeted = new Set<string>();
    exercises.forEach((ex) => {
      const muscles = ex.exercise_type.targeted_muscles;
      if (typeof muscles === 'string') {
        muscles.split(',').forEach((muscle) => musclesTargeted.add(muscle.trim()));
      } else if (Array.isArray(muscles)) {
        muscles.forEach((muscle) => musclesTargeted.add(muscle));
      }
    });

    return {
      totalExercises,
      totalDuration,
      estimatedCalories: totalCalories,
      byDifficulty,
      musclesTargeted: Array.from(musclesTargeted),
    };
  }
}

export default new DefiExerciceService();