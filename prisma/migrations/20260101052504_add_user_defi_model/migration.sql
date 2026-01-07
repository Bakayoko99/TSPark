-- CreateEnum
CREATE TYPE "UserDefiStatus" AS ENUM ('INVITED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED');

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

-- CreateIndex
CREATE UNIQUE INDEX "user_defis_user_id_challenge_id_key" ON "user_defis"("user_id", "challenge_id");

-- AddForeignKey
ALTER TABLE "user_defis" ADD CONSTRAINT "user_defis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_defis" ADD CONSTRAINT "user_defis_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "defis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
