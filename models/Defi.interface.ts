export enum DefiStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface Defi {
  id: number;
  creator_id: number;
  gym_id: number | null;
  title: string;
  description: string;
  difficulty_level: DifficultyLevel;
  duration_days: number;
  start_date: Date | null;
  end_date: Date | null;
  is_collaborative: boolean;
  target_calories: number | null;
  status: DefiStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDefiInput {
  gym_id?: number;
  title: string;
  description: string;
  difficulty_level: DifficultyLevel;
  duration_days: number;
  start_date?: Date;
  end_date?: Date;
  is_collaborative?: boolean;
  target_calories?: number;
  status?: DefiStatus;
}

export interface UpdateDefiInput {
  title?: string;
  description?: string;
  difficulty_level?: DifficultyLevel;
  duration_days?: number;
  start_date?: Date;
  end_date?: Date;
  is_collaborative?: boolean;
  target_calories?: number;
  status?: DefiStatus;
  gym_id?: number;
}