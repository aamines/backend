/*
  Warnings:

  - You are about to drop the column `statusId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_statusId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Status";
