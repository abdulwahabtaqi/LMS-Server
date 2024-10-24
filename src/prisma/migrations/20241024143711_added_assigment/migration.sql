/*
  Warnings:

  - You are about to drop the column `exportType` on the `assignmentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `assignmentQuestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assignmentQuestion" DROP CONSTRAINT "assignmentQuestion_questionsId_fkey";

-- AlterTable
ALTER TABLE "assignmentQuestion" DROP COLUMN "exportType",
DROP COLUMN "status";

-- CreateTable
CREATE TABLE "_AssignmentQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentQuestions_AB_unique" ON "_AssignmentQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentQuestions_B_index" ON "_AssignmentQuestions"("B");

-- AddForeignKey
ALTER TABLE "_AssignmentQuestions" ADD CONSTRAINT "_AssignmentQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentQuestions" ADD CONSTRAINT "_AssignmentQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "assignmentQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
