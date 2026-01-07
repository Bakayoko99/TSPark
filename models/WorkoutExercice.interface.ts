export interface WorkoutExercice {
  id: number;
  workout_session_id: number;
  exercise_type_id: number;
  repetitions: number | null;
  duration_minutes: number | null;
  weight_kg: number | null;
}

export interface CreateWorkoutExerciceInput {
  workout_session_id: number;
  exercise_type_id: number;
  repetitions?: number;
  duration_minutes?: number;
  weight_kg?: number;
}

export interface UpdateWorkoutExerciceInput {
  repetitions?: number;
  duration_minutes?: number;
  weight_kg?: number;
}

export interface BulkCreateWorkoutExerciceInput {
  workout_session_id: number;
  exercises: {
    exercise_type_id: number;
    repetitions?: number;
    duration_minutes?: number;
    weight_kg?: number;
  }[];
}