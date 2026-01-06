-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('CHALLENGE_COMPLETION', 'STREAK', 'MILESTONE', 'SPECIAL');

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

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE INDEX "badges_badge_type_idx" ON "badges"("badge_type");

-- CreateIndex
CREATE INDEX "badges_created_by_idx" ON "badges"("created_by");

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
