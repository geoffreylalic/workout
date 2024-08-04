/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Exercice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercice" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
