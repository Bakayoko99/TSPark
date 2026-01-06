export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface ExerciceType {
  id: number;
  name: string;
  description: string;
  difficulty_level: DifficultyLevel;
  targeted_muscles: string;
  calories_per_hour: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateExerciceTypeInput {
  name: string;
  description: string;
  difficulty_level: DifficultyLevel;
  targeted_muscles: string | string[];
  calories_per_hour: number;
}

export interface UpdateExerciceTypeInput {
  name?: string;
  description?: string;
  difficulty_level?: DifficultyLevel;
  targeted_muscles?: string | string[];
  calories_per_hour?: number;
}