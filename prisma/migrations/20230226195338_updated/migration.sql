-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "statusId" SET DEFAULT 1,
ALTER COLUMN "roleId" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "statusId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "statusId" SET DEFAULT 1;
