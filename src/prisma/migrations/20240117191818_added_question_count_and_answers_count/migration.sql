-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QuestionType" ADD VALUE 'MULTIPLSHORT';
ALTER TYPE "QuestionType" ADD VALUE 'MULTIPLLONG';

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "answerImage" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answerCount" INTEGER NOT NULL DEFAULT 0;
