/*
  Warnings:

  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Memory_Types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_groupsId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_banner_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_profile_fkey";

-- DropForeignKey
ALTER TABLE "Memory" DROP CONSTRAINT "Memory_memory_Type_fkey";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "Memory_Types";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "communityId" INTEGER NOT NULL,
    "profile" INTEGER,
    "banner" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory_Type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Memory_Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_banner_fkey" FOREIGN KEY ("banner") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_profile_fkey" FOREIGN KEY ("profile") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_memory_Type_fkey" FOREIGN KEY ("memory_Type") REFERENCES "Memory_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
