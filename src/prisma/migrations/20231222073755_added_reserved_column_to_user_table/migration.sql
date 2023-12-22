-- CreateTable
CREATE TABLE "Reserved" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "questionsId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reserved" ADD CONSTRAINT "Reserved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
