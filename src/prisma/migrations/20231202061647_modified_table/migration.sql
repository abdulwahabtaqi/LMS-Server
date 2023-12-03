/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[schoolId,grade]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subTopicId,question]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topicId,subTopic]` on the table `SubTopic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gradeId,subject]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId,topic]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Made the column `grade` on table `Grade` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_subTopicId_fkey";

-- DropForeignKey
ALTER TABLE "SubTopic" DROP CONSTRAINT "SubTopic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_subjectId_fkey";

-- DropIndex
DROP INDEX "Grade_grade_key";

-- DropIndex
DROP INDEX "Questions_question_key";

-- DropIndex
DROP INDEX "SubTopic_subTopic_key";

-- DropIndex
DROP INDEX "Subject_subject_key";

-- DropIndex
DROP INDEX "Topic_topic_key";

-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "grade" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" DEFAULT 'TEACHER';

-- CreateIndex
CREATE UNIQUE INDEX "Grade_schoolId_grade_key" ON "Grade"("schoolId", "grade");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_subTopicId_question_key" ON "Questions"("subTopicId", "question");

-- CreateIndex
CREATE UNIQUE INDEX "SubTopic_topicId_subTopic_key" ON "SubTopic"("topicId", "subTopic");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_gradeId_subject_key" ON "Subject"("gradeId", "subject");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_topic_key" ON "Topic"("subjectId", "topic");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTopic" ADD CONSTRAINT "SubTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_subTopicId_fkey" FOREIGN KEY ("subTopicId") REFERENCES "SubTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
