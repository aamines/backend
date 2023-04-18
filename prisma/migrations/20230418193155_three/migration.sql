-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsOnAccounts" (
    "accountId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "SkillsOnAccounts_pkey" PRIMARY KEY ("accountId","skillId")
);

-- AddForeignKey
ALTER TABLE "SkillsOnAccounts" ADD CONSTRAINT "SkillsOnAccounts_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnAccounts" ADD CONSTRAINT "SkillsOnAccounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
