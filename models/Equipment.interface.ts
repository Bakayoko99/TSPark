export interface Equipment {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  created_at: Date;
}

export interface CreateEquipmentInput {
  name: string;
  description: string;
  image_url?: string;
}

export interface UpdateEquipmentInput {
  name?: string;
  description?: string;
  image_url?: string;
}