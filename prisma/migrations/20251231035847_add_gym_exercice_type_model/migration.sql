-- CreateTable
CREATE TABLE "gym_exercice_types" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "exercice_type_id" INTEGER NOT NULL,

    CONSTRAINT "gym_exercice_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gym_exercice_types_gym_id_exercice_type_id_key" ON "gym_exercice_types"("gym_id", "exercice_type_id");

-- AddForeignKey
ALTER TABLE "gym_exercice_types" ADD CONSTRAINT "gym_exercice_types_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_exercice_types" ADD CONSTRAINT "gym_exercice_types_exercice_type_id_fkey" FOREIGN KEY ("exercice_type_id") REFERENCES "exercice_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
