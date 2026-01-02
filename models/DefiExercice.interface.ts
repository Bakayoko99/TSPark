export interface DefiExercice {
  id: number;
  challenge_id: number;
  exercise_type_id: number;
  target_repetitions: number | null;
  target_duration_minutes: number | null;
  order_index: number;
}

export interface CreateDefiExerciceInput {
  challenge_id: number;
  exercise_type_id: number;
  target_repetitions?: number;
  target_duration_minutes?: number;
  order_index: number;
}

export interface UpdateDefiExerciceInput {
  target_repetitions?: number;
  target_duration_minutes?: number;
  order_index?: number;
}

export interface BulkCreateDefiExerciceInput {
  challenge_id: number;
  exercises: {
    exercise_type_id: number;
    target_repetitions?: number;
    target_duration_minutes?: number;
    order_index: number;
  }[];
}

export interface ReorderDefiExerciceInput {
  id: number;
  order_index: number;
}