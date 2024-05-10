-- AlterTable
ALTER TABLE "ExportedQuestion" ALTER COLUMN "questionsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExportedQuestion" ADD CONSTRAINT "ExportedQuestion_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
