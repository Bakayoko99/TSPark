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
