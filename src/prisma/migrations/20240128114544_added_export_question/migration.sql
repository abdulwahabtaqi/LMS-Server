/*
  Warnings:

  - You are about to drop the `Reserved` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ExportTypes" AS ENUM ('PRACTICE', 'PAPER');

-- DropForeignKey
ALTER TABLE "Reserved" DROP CONSTRAINT "Reserved_userId_fkey";

-- DropTable
DROP TABLE "Reserved";

-- CreateTable
CREATE TABLE "ExportedQuestion" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "questionsId" TEXT NOT NULL,
    "exportType" "ExportTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExportedQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExportedQuestion" ADD CONSTRAINT "ExportedQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
