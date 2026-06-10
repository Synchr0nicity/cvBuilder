/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "idToken",
DROP COLUMN "refreshToken",
DROP COLUMN "tokenType",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3);
