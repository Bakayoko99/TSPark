export enum UserDefiStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}

export interface UserDefi {
  id: number;
  user_id: number;
  challenge_id: number;
  status: UserDefiStatus;
  progress_percentage: number;
  joined_at: Date;
  completed_at: Date | null;
}

export interface JoinDefiInput {
  challenge_id: number;
  // user_id sera récupéré du token
}

export interface InviteUserInput {
  challenge_id: number;
  user_id: number;
}

export interface UpdateProgressInput {
  progress_percentage: number;
  status?: UserDefiStatus;
}

export interface BulkInviteInput {
  challenge_id: number;
  user_ids: number[];
}