export interface GymEquipment {
  id: number;
  gym_id: number;
  equipment_id: number;
  quantity: number;
}

export interface CreateGymEquipmentInput {
  gym_id: number;
  equipment_id: number;
  quantity: number;
}

export interface UpdateGymEquipmentInput {
  quantity?: number;
}

export interface GymEquipmentWithDetails {
  id: number;
  gym_id: number;
  equipment_id: number;
  quantity: number;
  equipment: {
    id: number;
    name: string;
    description: string;
    image_url: string | null;
  };
  gym: {
    id: number;
    name: string;
    city: string;
  };
}