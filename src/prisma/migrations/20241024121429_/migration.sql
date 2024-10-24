/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_assignmentId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "Submission";

-- DropTable
DROP TABLE "Title";

-- CreateTable
CREATE TABLE "assignmentQuestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "userId" TEXT,
    "questionsId" TEXT,
    "exportType" "ExportTypes" NOT NULL,
    "status" "ExportedQuestionStatus" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignmentQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
