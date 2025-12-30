export enum Role {
  ADMIN = 'ADMIN',
  GYM_OWNER = 'GYM_OWNER',
  CLIENT = 'CLIENT'
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: Role;
  profile_picture_url: string | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  player_score: number;
}

export interface CreateUserInput {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role?: Role;
  profile_picture_url?: string;
  is_active?: boolean;
  player_score?: number;
}

export interface UpdateUserInput {
  email?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  role?: Role;
  profile_picture_url?: string;
  is_active?: boolean;
  player_score?: number;
}
