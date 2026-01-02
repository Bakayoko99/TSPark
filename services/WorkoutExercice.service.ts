import { PrismaClient } from '@prisma/client';
import { CreateWorkoutExerciceInput, UpdateWorkoutExerciceInput, BulkCreateWorkoutExerciceInput } from '../models/WorkoutExercice.interface';

const prisma = new PrismaClient();

export class WorkoutExerciceService {
  async addExerciceToSession(data: CreateWorkoutExerciceInput) {
    return await prisma.workoutExercice.create({
      data: {
        workout_session_id: data.workout_session_id,
        exercise_type_id: data.exercise_type_id,
        repetitions: data.repetitions,
        duration_minutes: data.duration_minutes,
        weight_kg: data.weight_kg,
      },
      include: {
        workout_session: {
          select: {
            id: true,
            session_date: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty_level: true,
            calories_per_hour: true,
            targeted_muscles: true,
          },
        },
      },
    });
  }

  async addMultipleExercicesToSession(data: BulkCreateWorkoutExerciceInput) {
    const operations = data.exercises.map((exercise) =>
      prisma.workoutExercice.create({
        data: {
          workout_session_id: data.workout_session_id,
          exercise_type_id: exercise.exercise_type_id,
          repetitions: exercise.repetitions,
          duration_minutes: exercise.duration_minutes,
          weight_kg: exercise.weight_kg,
        },
        include: {
          exercise_type: {
            select: {
              id: true,
              name: true,
              calories_per_hour: true,
            },
          },
        },
      })
    );

    return await prisma.$transaction(operations);
  }

  async getExercicesBySessionId(workout_session_id: number) {
    return await prisma.workoutExercice.findMany({
      where: { workout_session_id },
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
        id: 'asc',
      },
    });
  }

  async getSessionsByExerciceTypeId(exercise_type_id: number) {
    return await prisma.workoutExercice.findMany({
      where: { exercise_type_id },
      include: {
        workout_session: {
          select: {
            id: true,
            session_date: true,
            duration_minutes: true,
            calories_burned: true,
            user: {
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
        },
      },
      orderBy: {
        workout_session: {
          session_date: 'desc',
        },
      },
    });
  }

  async getById(id: number) {
    return await prisma.workoutExercice.findUnique({
      where: { id },
      include: {
        workout_session: {
          select: {
            id: true,
            session_date: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty_level: true,
            calories_per_hour: true,
          },
        },
      },
    });
  }

  async countExercicesBySessionId(workout_session_id: number) {
    return await prisma.workoutExercice.count({
      where: { workout_session_id },
    });
  }

  async calculateSessionCalories(workout_session_id: number) {
    const exercises = await prisma.workoutExercice.findMany({
      where: { workout_session_id },
      include: {
        exercise_type: {
          select: {
            calories_per_hour: true,
          },
        },
      },
    });

    const totalCalories = exercises.reduce((sum, exercise) => {
      const duration = exercise.duration_minutes || 0;
      // Convertir calories_per_hour en calories_per_minute
      const caloriesPerMinute = exercise.exercise_type.calories_per_hour / 60;
      return sum + duration * caloriesPerMinute;
    }, 0);

    return Math.round(totalCalories);
  }

  async getExercicesByUserId(user_id: number) {
    return await prisma.workoutExercice.findMany({
      where: {
        workout_session: {
          user_id,
        },
      },
      include: {
        exercise_type: {
          select: {
            id: true,
            name: true,
            targeted_muscles: true,
            difficulty_level: true,
          },
        },
        workout_session: {
          select: {
            id: true,
            session_date: true,
          },
        },
      },
      orderBy: {
        workout_session: {
          session_date: 'desc',
        },
      },
    });
  }

  async getMostPracticedExercices(user_id: number, limit: number = 10) {
    const result = await prisma.workoutExercice.groupBy({
      by: ['exercise_type_id'],
      where: {
        workout_session: {
          user_id,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        repetitions: true,
        duration_minutes: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });

    const exerciseTypeIds = result.map(r => r.exercise_type_id);
    const exerciseTypes = await prisma.exerciceType.findMany({
      where: { id: { in: exerciseTypeIds } },
      select: {
        id: true,
        name: true,
        targeted_muscles: true,
        difficulty_level: true,
      },
    });

    return result.map(r => {
      const exerciseType = exerciseTypes.find(e => e.id === r.exercise_type_id);
      return {
        exerciseType,
        totalSessions: r._count.id,
        totalRepetitions: r._sum.repetitions || 0,
        totalDuration: r._sum.duration_minutes || 0,
      };
    });
  }

  async getExerciceProgress(user_id: number, exercise_type_id: number) {
    return await prisma.workoutExercice.findMany({
      where: {
        exercise_type_id,
        workout_session: {
          user_id,
        },
      },
      select: {
        id: true,
        repetitions: true,
        duration_minutes: true,
        weight_kg: true,
        workout_session: {
          select: {
            session_date: true,
          },
        },
      },
      orderBy: {
        workout_session: {
          session_date: 'asc',
        },
      },
    });
  }

  async update(id: number, data: UpdateWorkoutExerciceInput) {
    return await prisma.workoutExercice.update({
      where: { id },
      data: {
        repetitions: data.repetitions,
        duration_minutes: data.duration_minutes,
        weight_kg: data.weight_kg,
      },
      include: {
        workout_session: {
          select: {
            id: true,
            session_date: true,
          },
        },
        exercise_type: {
          select: {
            id: true,
            name: true,
            targeted_muscles: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return await prisma.workoutExercice.delete({
      where: { id },
    });
  }

  async deleteAllBySessionId(workout_session_id: number) {
    return await prisma.workoutExercice.deleteMany({
      where: { workout_session_id },
    });
  }

  async getSessionStats(workout_session_id: number) {
    const exercises = await prisma.workoutExercice.findMany({
      where: { workout_session_id },
      include: {
        exercise_type: {
          select: {
            difficulty_level: true,
            calories_per_hour: true,
            targeted_muscles: true,
          },
        },
      },
    });

    const totalExercises = exercises.length;
    const totalRepetitions = exercises.reduce((sum, ex) => sum + (ex.repetitions || 0), 0);
    const totalDuration = exercises.reduce((sum, ex) => sum + (ex.duration_minutes || 0), 0);
    const estimatedCalories = await this.calculateSessionCalories(workout_session_id);

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
      totalRepetitions,
      totalDuration,
      estimatedCalories,
      byDifficulty,
      musclesTargeted: Array.from(musclesTargeted),
    };
  }

  async getUserExerciceStats(user_id: number) {
    const exercises = await prisma.workoutExercice.findMany({
      where: {
        workout_session: {
          user_id,
        },
      },
      include: {
        exercise_type: {
          select: {
            targeted_muscles: true,
          },
        },
      },
    });

    const totalExercises = exercises.length;
    const totalRepetitions = exercises.reduce((sum, ex) => sum + (ex.repetitions || 0), 0);
    const totalDuration = exercises.reduce((sum, ex) => sum + (ex.duration_minutes || 0), 0);

    const musclesTargeted = new Set<string>();
    exercises.forEach((ex) => {
      const muscles = ex.exercise_type.targeted_muscles;
      if (typeof muscles === 'string') {
        muscles.split(',').forEach((muscle) => musclesTargeted.add(muscle.trim()));
      } else if (Array.isArray(muscles)) {
        muscles.forEach((muscle) => musclesTargeted.add(muscle));
      }
    });

    const uniqueExercises = new Set(exercises.map(e => e.exercise_type_id)).size;

    return {
      totalExercises,
      totalRepetitions,
      totalDuration,
      musclesTargeted: Array.from(musclesTargeted),
      uniqueExercises,
    };
  }
}

export default new WorkoutExerciceService();