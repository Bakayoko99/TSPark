-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GYM_OWNER', 'CLIENT');

-- CreateEnum
CREATE TYPE "SalleStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "DefiStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "UserDefiStatus" AS ENUM ('INVITED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('CHALLENGE_COMPLETION', 'STREAK', 'MILESTONE', 'SPECIAL');

-- CreateEnum
CREATE TYPE "BadgeRuleType" AS ENUM ('CHALLENGE_COMPLETED', 'CHALLENGES_COUNT', 'CONSECUTIVE_DAYS', 'TOTAL_SESSIONS', 'TOTAL_CALORIES', 'TOTAL_WEIGHT_LIFTED', 'SPECIFIC_EXERCISE', 'PLAYER_SCORE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "profile_picture_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "player_score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salles" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "SalleStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approved_by" INTEGER,
    "approved_at" TIMESTAMP(3),

    CONSTRAINT "salles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_equipments" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "gym_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercice_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty_level" "DifficultyLevel" NOT NULL,
    "targeted_muscles" TEXT NOT NULL,
    "calories_per_hour" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercice_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_exercice_types" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "exercice_type_id" INTEGER NOT NULL,

    CONSTRAINT "gym_exercice_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defis" (
    "id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "gym_id" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty_level" "DifficultyLevel" NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_collaborative" BOOLEAN NOT NULL DEFAULT false,
    "target_calories" INTEGER,
    "status" "DefiStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "defis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defi_exercices" (
    "id" SERIAL NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "exercise_type_id" INTEGER NOT NULL,
    "target_repetitions" INTEGER,
    "target_duration_minutes" INTEGER,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "defi_exercices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_defis" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "status" "UserDefiStatus" NOT NULL DEFAULT 'INVITED',
    "progress_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "user_defis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER,
    "gym_id" INTEGER,
    "session_date" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "calories_burned" INTEGER NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_exercices" (
    "id" SERIAL NOT NULL,
    "workout_session_id" INTEGER NOT NULL,
    "exercise_type_id" INTEGER NOT NULL,
    "repetitions" INTEGER,
    "duration_minutes" INTEGER,
    "weight_kg" DECIMAL(5,2),

    CONSTRAINT "workout_exercices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "badge_type" "BadgeType" NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "awarded_by" INTEGER,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badge_rules" (
    "id" SERIAL NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "rule_type" "BadgeRuleType" NOT NULL,
    "rule_config" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "badge_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gym_equipments_gym_id_equipment_id_key" ON "gym_equipments"("gym_id", "equipment_id");

-- CreateIndex
CREATE UNIQUE INDEX "exercice_types_name_key" ON "exercice_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gym_exercice_types_gym_id_exercice_type_id_key" ON "gym_exercice_types"("gym_id", "exercice_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "defi_exercices_challenge_id_exercise_type_id_key" ON "defi_exercices"("challenge_id", "exercise_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_defis_user_id_challenge_id_key" ON "user_defis"("user_id", "challenge_id");

-- CreateIndex
CREATE INDEX "workout_sessions_user_id_idx" ON "workout_sessions"("user_id");

-- CreateIndex
CREATE INDEX "workout_sessions_challenge_id_idx" ON "workout_sessions"("challenge_id");

-- CreateIndex
CREATE INDEX "workout_sessions_gym_id_idx" ON "workout_sessions"("gym_id");

-- CreateIndex
CREATE INDEX "workout_sessions_session_date_idx" ON "workout_sessions"("session_date");

-- CreateIndex
CREATE INDEX "workout_exercices_workout_session_id_idx" ON "workout_exercices"("workout_session_id");

-- CreateIndex
CREATE INDEX "workout_exercices_exercise_type_id_idx" ON "workout_exercices"("exercise_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE INDEX "badges_badge_type_idx" ON "badges"("badge_type");

-- CreateIndex
CREATE INDEX "badges_created_by_idx" ON "badges"("created_by");

-- CreateIndex
CREATE INDEX "user_badges_user_id_idx" ON "user_badges"("user_id");

-- CreateIndex
CREATE INDEX "user_badges_badge_id_idx" ON "user_badges"("badge_id");

-- CreateIndex
CREATE INDEX "user_badges_awarded_at_idx" ON "user_badges"("awarded_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_user_id_badge_id_key" ON "user_badges"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "badge_rules_badge_id_idx" ON "badge_rules"("badge_id");

-- CreateIndex
CREATE INDEX "badge_rules_rule_type_idx" ON "badge_rules"("rule_type");

-- AddForeignKey
ALTER TABLE "salles" ADD CONSTRAINT "salles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salles" ADD CONSTRAINT "salles_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_equipments" ADD CONSTRAINT "gym_equipments_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_equipments" ADD CONSTRAINT "gym_equipments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_exercice_types" ADD CONSTRAINT "gym_exercice_types_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_exercice_types" ADD CONSTRAINT "gym_exercice_types_exercice_type_id_fkey" FOREIGN KEY ("exercice_type_id") REFERENCES "exercice_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defis" ADD CONSTRAINT "defis_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defis" ADD CONSTRAINT "defis_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defi_exercices" ADD CONSTRAINT "defi_exercices_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "defis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defi_exercices" ADD CONSTRAINT "defi_exercices_exercise_type_id_fkey" FOREIGN KEY ("exercise_type_id") REFERENCES "exercice_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_defis" ADD CONSTRAINT "user_defis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_defis" ADD CONSTRAINT "user_defis_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "defis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "defis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercices" ADD CONSTRAINT "workout_exercices_workout_session_id_fkey" FOREIGN KEY ("workout_session_id") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercices" ADD CONSTRAINT "workout_exercices_exercise_type_id_fkey" FOREIGN KEY ("exercise_type_id") REFERENCES "exercice_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_awarded_by_fkey" FOREIGN KEY ("awarded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badge_rules" ADD CONSTRAINT "badge_rules_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
