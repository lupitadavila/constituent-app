/*
  Warnings:

  - You are about to drop the column `registration` on the `constituents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "constituents" DROP COLUMN "registration";

-- DropEnum
DROP TYPE "VotingRegistration";
