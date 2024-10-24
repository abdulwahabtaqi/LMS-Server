/*
  Warnings:

  - You are about to drop the column `questionsId` on the `assignmentQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assignmentQuestion" DROP COLUMN "questionsId",
ADD COLUMN     "gradeId" TEXT,
ADD COLUMN     "schoolId" TEXT,
ADD COLUMN     "subTopicId" TEXT,
ADD COLUMN     "subjectId" TEXT,
ADD COLUMN     "topicId" TEXT;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentQuestion" ADD CONSTRAINT "assignmentQuestion_subTopicId_fkey" FOREIGN KEY ("subTopicId") REFERENCES "SubTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
