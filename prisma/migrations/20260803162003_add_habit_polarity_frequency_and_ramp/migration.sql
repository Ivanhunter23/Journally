/*
  Warnings:

  - The values [QUANTITATIVE] on the enum `HabitType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "HabitPolarity" AS ENUM ('BUILD', 'QUIT');

-- CreateEnum
CREATE TYPE "HabitFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'INTERVAL');

-- AlterEnum
BEGIN;
CREATE TYPE "HabitType_new" AS ENUM ('BINARY', 'DURATION', 'COUNT');
ALTER TABLE "Habit" ALTER COLUMN "type" TYPE "HabitType_new" USING ("type"::text::"HabitType_new");
ALTER TYPE "HabitType" RENAME TO "HabitType_old";
ALTER TYPE "HabitType_new" RENAME TO "HabitType";
DROP TYPE "public"."HabitType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "description" TEXT,
ADD COLUMN     "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
ADD COLUMN     "incrementEveryDays" INTEGER,
ADD COLUMN     "incrementValue" INTEGER,
ADD COLUMN     "intervalDays" INTEGER,
ADD COLUMN     "polarity" "HabitPolarity" NOT NULL DEFAULT 'BUILD',
ADD COLUMN     "startValue" INTEGER;
