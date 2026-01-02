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

-- CreateIndex
CREATE UNIQUE INDEX "defi_exercices_challenge_id_exercise_type_id_key" ON "defi_exercices"("challenge_id", "exercise_type_id");

-- AddForeignKey
ALTER TABLE "defi_exercices" ADD CONSTRAINT "defi_exercices_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "defis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defi_exercices" ADD CONSTRAINT "defi_exercices_exercise_type_id_fkey" FOREIGN KEY ("exercise_type_id") REFERENCES "exercice_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
