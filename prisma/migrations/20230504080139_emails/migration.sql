/*
  Warnings:

  - Made the column `statusId` on table `Invitation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_statusId_fkey";

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "statusId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Email_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Email_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email_type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Email_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Invitation_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Email_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Email_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
