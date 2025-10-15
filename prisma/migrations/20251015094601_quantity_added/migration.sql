/*
  Warnings:

  - Added the required column `quantity` to the `IngredientsForCocktails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IngredientsForCocktails" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;
