export interface GymExerciceType {
  id: number;
  gym_id: number;
  exercice_type_id: number;
}

export interface CreateGymExerciceTypeInput {
  gym_id: number;
  exercice_type_id: number;
}

export interface GymExerciceTypeWithDetails {
  id: number;
  gym_id: number;
  exercice_type_id: number;
  exercice_type: {
    id: number;
    name: string;
    description: string;
    difficulty_level: string;
    targeted_muscles: string;
    calories_per_hour: number;
  };
  gym: {
    id: number;
    name: string;
    city: string;
  };
}