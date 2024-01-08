/*
  Warnings:

  - A unique constraint covering the columns `[importId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_importId_key" ON "Question"("importId");
