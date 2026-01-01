-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

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

-- CreateIndex
CREATE UNIQUE INDEX "exercice_types_name_key" ON "exercice_types"("name");
