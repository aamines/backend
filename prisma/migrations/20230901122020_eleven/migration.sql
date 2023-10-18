/*
  Warnings:

  - You are about to drop the column `banner` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "banner",
DROP COLUMN "profile",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "size" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "banner" TEXT,
    "profile" TEXT,
    "status" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
