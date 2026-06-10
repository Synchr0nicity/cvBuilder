/*
  Warnings:

  - You are about to drop the column `isDefault` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_resumeId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "isDefault",
DROP COLUMN "summary",
DROP COLUMN "template",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "style" JSONB NOT NULL;

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Skill";
