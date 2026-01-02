-- CreateEnum
CREATE TYPE "DefiStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

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

-- AddForeignKey
ALTER TABLE "defis" ADD CONSTRAINT "defis_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defis" ADD CONSTRAINT "defis_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
