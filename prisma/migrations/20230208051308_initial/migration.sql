/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordCode" TEXT,
ADD COLUMN     "resetPasswordCodeExpiresAt" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPasswordCode_key" ON "User"("resetPasswordCode");
