-- CreateEnum
CREATE TYPE "Source" AS ENUM ('CSV', 'L2', 'ZENDESK');

-- CreateEnum
CREATE TYPE "VotingRegistration" AS ENUM ('DEMOCRAT', 'REPUBLICAN', 'INDEPENDENT', 'UNREGISTERED', 'OTHER');

-- CreateTable
CREATE TABLE "constituents" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "address" TEXT,
    "phoneNumber" INTEGER,
    "zip" INTEGER,
    "registration" "VotingRegistration" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constituents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "value" TEXT,
    "source" "Source" NOT NULL,
    "constituentId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "constituents_email_key" ON "constituents"("email");

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_constituentId_fkey" FOREIGN KEY ("constituentId") REFERENCES "constituents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
