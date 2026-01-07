export enum SalleStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Salle {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  contact_phone: string;
  contact_email: string;
  description: string;
  capacity: number;
  status: SalleStatus;
  created_at: Date;
  updated_at: Date;
  approved_by: number | null;
  approved_at: Date | null;
}

export interface CreateSalleInput {
  owner_id: number;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  contact_phone: string;
  contact_email: string;
  description: string;
  capacity: number;
  status?: SalleStatus;
}

export interface UpdateSalleInput {
  name?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  contact_phone?: string;
  contact_email?: string;
  description?: string;
  capacity?: number;
  status?: SalleStatus;
}

export interface ApproveSalleInput {
  approved_by: number;
  status: SalleStatus.APPROVED | SalleStatus.REJECTED;
}