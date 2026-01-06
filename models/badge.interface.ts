export enum BadgeType {
  CHALLENGE_COMPLETION = 'CHALLENGE_COMPLETION',
  STREAK = 'STREAK',
  MILESTONE = 'MILESTONE',
  SPECIAL = 'SPECIAL'
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  image_url: string;
  badge_type: BadgeType;
  created_by: number;
  created_at: Date;
}

export interface CreateBadgeInput {
  name: string;
  description: string;
  image_url: string;
  badge_type: BadgeType;
}

export interface UpdateBadgeInput {
  name?: string;
  description?: string;
  image_url?: string;
  badge_type?: BadgeType;
}
