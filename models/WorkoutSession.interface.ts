export interface WorkoutSession {
  id: number;
  user_id: number;
  challenge_id: number | null;
  gym_id: number | null;
  session_date: Date;
  duration_minutes: number;
  calories_burned: number;
  notes: string | null;
  created_at: Date;
}

export interface CreateWorkoutSessionInput {
  // user_id sera récupéré du token
  challenge_id?: number;
  gym_id?: number;
  session_date: Date;
  duration_minutes: number;
  calories_burned: number;
  notes?: string;
}

export interface UpdateWorkoutSessionInput {
  challenge_id?: number;
  gym_id?: number;
  session_date?: Date;
  duration_minutes?: number;
  calories_burned?: number;
  notes?: string;
}

export interface WorkoutSessionFilters {
  user_id?: number;
  challenge_id?: number;
  gym_id?: number;
  start_date?: Date;
  end_date?: Date;
  min_duration?: number;
  max_duration?: number;
  min_calories?: number;
  max_calories?: number;
}