/*
  Warnings:

  - Added the required column `code` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ALTER COLUMN "invitee" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
