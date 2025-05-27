/*
  Warnings:

  - The `rest` column on the `Set` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "rest",
ADD COLUMN     "rest" INTEGER;
