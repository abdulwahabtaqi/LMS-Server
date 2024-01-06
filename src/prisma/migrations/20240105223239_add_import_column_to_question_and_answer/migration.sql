/*
  Warnings:

  - Added the required column `importId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "importId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "importId" TEXT NOT NULL;
