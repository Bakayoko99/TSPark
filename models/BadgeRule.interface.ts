export enum BadgeRuleType {
  CHALLENGE_COMPLETED = 'CHALLENGE_COMPLETED',
  CHALLENGES_COUNT = 'CHALLENGES_COUNT',
  CONSECUTIVE_DAYS = 'CONSECUTIVE_DAYS',
  TOTAL_SESSIONS = 'TOTAL_SESSIONS',
  TOTAL_CALORIES = 'TOTAL_CALORIES',
  TOTAL_WEIGHT_LIFTED = 'TOTAL_WEIGHT_LIFTED',
  SPECIFIC_EXERCISE = 'SPECIFIC_EXERCISE',
  PLAYER_SCORE = 'PLAYER_SCORE',
}

export interface BadgeRuleConfig {
    challenge_id?: number;
    count?: number;
    difficulty_level?: string;
    days?: number;
    sessions_count?: number;
    calories?: number;
    weight_kg?: number;
    exercise_type_id?: number;
    repetitions?: number;
    score?: number;
}

export interface BadgeRule {
  id: number;
  badge_id: number;
  rule_type: BadgeRuleType;
  rule_config: BadgeRuleConfig;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBadgeRuleInput {
  badge_id: number;
  rule_type: BadgeRuleType;
  rule_config: BadgeRuleConfig;
}

export interface UpdateBadgeRuleInput {
  rule_type?: BadgeRuleType;
  rule_config?: BadgeRuleConfig;
  is_active?: boolean;
}

export interface UserBadge {
  id: number;
  user_id: number;
  badge_id: number;
  awarded_at: Date;
  awarded_by?: number;
}

export interface AwardBadgeInput {
  user_id: number;
  badge_id: number;
  awarded_by?: number;
}