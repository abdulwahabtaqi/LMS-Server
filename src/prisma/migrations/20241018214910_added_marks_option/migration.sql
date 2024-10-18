-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "lastSubmissionDate" DROP NOT NULL,
ALTER COLUMN "lastSubmissionDate" DROP DEFAULT,
ALTER COLUMN "totalMarks" DROP NOT NULL,
ALTER COLUMN "totalMarks" DROP DEFAULT;
