/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `dificultyLevel` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `DifficultyLevel` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "isCorrect";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "dificultyLevel",
ADD COLUMN     "DifficultyLevel" "DifficultyLevel" NOT NULL;

-- DropEnum
DROP TYPE "DificultyLevel";
