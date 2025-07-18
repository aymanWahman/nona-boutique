/*
  Warnings:

  - You are about to drop the `Extra` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductColor" AS ENUM ('BLACK', 'WHITE', 'RED', 'GRAY');

-- DropForeignKey
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_productId_fkey";

-- DropTable
DROP TABLE "Extra";

-- DropEnum
DROP TYPE "ExtraIngredients";

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" "ProductColor" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
