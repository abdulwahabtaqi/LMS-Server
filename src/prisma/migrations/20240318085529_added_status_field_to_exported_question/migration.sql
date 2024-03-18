-- CreateEnum
CREATE TYPE "ExportedQuestionStatus" AS ENUM ('NORMAL', 'DELETED');

-- AlterTable
ALTER TABLE "ExportedQuestion" ADD COLUMN     "status" "ExportedQuestionStatus" NOT NULL DEFAULT 'NORMAL';
