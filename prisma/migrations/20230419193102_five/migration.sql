/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Memory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mediaId]` on the table `Memory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `communityId` to the `Memory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "communityId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mediaId" INTEGER NOT NULL,
ADD COLUMN     "viewers" INTEGER[];

-- CreateTable
CREATE TABLE "MemoryViewers" (
    "accountId" INTEGER NOT NULL,
    "memoryId" INTEGER NOT NULL,

    CONSTRAINT "MemoryViewers_pkey" PRIMARY KEY ("accountId","memoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Memory_accountId_key" ON "Memory"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Memory_mediaId_key" ON "Memory"("mediaId");

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryViewers" ADD CONSTRAINT "MemoryViewers_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryViewers" ADD CONSTRAINT "MemoryViewers_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
