/*
  Warnings:

  - You are about to drop the column `description` on the `Community` table. All the data in the column will be lost.
  - Added the required column `type` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vision` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "description",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vision" TEXT NOT NULL;
