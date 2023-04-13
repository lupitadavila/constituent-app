/*
  Warnings:

  - You are about to drop the `Trait` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trait" DROP CONSTRAINT "Trait_constituentId_fkey";

-- DropTable
DROP TABLE "Trait";

-- CreateTable
CREATE TABLE "traits" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "value" TEXT,
    "source" "Source" NOT NULL,
    "constituentId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "traits" ADD CONSTRAINT "traits_constituentId_fkey" FOREIGN KEY ("constituentId") REFERENCES "constituents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
