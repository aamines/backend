/*
  Warnings:

  - You are about to drop the column `Milestone_owner` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `Milestone_upvote` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the `AccountOnCommunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_Milestone_owner_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_Milestone_upvote_fkey";

-- DropForeignKey
ALTER TABLE "AccountOnCommunity" DROP CONSTRAINT "AccountOnCommunity_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountOnCommunity" DROP CONSTRAINT "AccountOnCommunity_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_creatorId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "Milestone_owner",
DROP COLUMN "Milestone_upvote",
ADD COLUMN     "milestone_owner" INTEGER,
ADD COLUMN     "milestone_upvote" INTEGER;

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "creatorId";

-- DropTable
DROP TABLE "AccountOnCommunity";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_milestone_owner_fkey" FOREIGN KEY ("milestone_owner") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_milestone_upvote_fkey" FOREIGN KEY ("milestone_upvote") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
