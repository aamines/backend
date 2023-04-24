-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "roleId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "names" TEXT NOT NULL DEFAULT '';
