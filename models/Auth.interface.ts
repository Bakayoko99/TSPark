import { Role } from './User.interface';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: Role;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    profile_picture_url: string | null;
  };
  token: string;
  refreshToken?: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: Role;
}