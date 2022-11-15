/*
  Warnings:

  - You are about to drop the `CommunityOnAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityOnAccount" DROP CONSTRAINT "CommunityOnAccount_accountId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityOnAccount" DROP CONSTRAINT "CommunityOnAccount_communityId_fkey";

-- DropTable
DROP TABLE "CommunityOnAccount";

-- CreateTable
CREATE TABLE "AccountOnCommunity" (
    "communityId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountOnCommunity_pkey" PRIMARY KEY ("communityId","accountId")
);

-- AddForeignKey
ALTER TABLE "AccountOnCommunity" ADD CONSTRAINT "AccountOnCommunity_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountOnCommunity" ADD CONSTRAINT "AccountOnCommunity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
