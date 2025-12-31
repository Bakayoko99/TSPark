-- CreateTable
CREATE TABLE "gym_equipments" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "gym_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gym_equipments_gym_id_equipment_id_key" ON "gym_equipments"("gym_id", "equipment_id");

-- AddForeignKey
ALTER TABLE "gym_equipments" ADD CONSTRAINT "gym_equipments_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "salles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_equipments" ADD CONSTRAINT "gym_equipments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
