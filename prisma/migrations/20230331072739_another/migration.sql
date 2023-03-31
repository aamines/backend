/*
  Warnings:

  - You are about to drop the column `project_owner` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `project_upvote` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationCodeExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordCodeExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_project_owner_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_project_upvote_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_communityId_fkey";

-- DropIndex
DROP INDEX "User_emailVerificationCode_key";

-- DropIndex
DROP INDEX "User_resetPasswordCode_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "project_owner",
DROP COLUMN "project_upvote",
ADD COLUMN     "Milestone_owner" INTEGER,
ADD COLUMN     "Milestone_upvote" INTEGER;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectId",
ADD COLUMN     "MilestoneId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "projectId",
ADD COLUMN     "MilestoneId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationCode",
DROP COLUMN "emailVerificationCodeExpiresAt",
DROP COLUMN "resetPasswordCode",
DROP COLUMN "resetPasswordCodeExpiresAt";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "Milestone" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_MilestoneId_fkey" FOREIGN KEY ("MilestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_Milestone_owner_fkey" FOREIGN KEY ("Milestone_owner") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_Milestone_upvote_fkey" FOREIGN KEY ("Milestone_upvote") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_MilestoneId_fkey" FOREIGN KEY ("MilestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
