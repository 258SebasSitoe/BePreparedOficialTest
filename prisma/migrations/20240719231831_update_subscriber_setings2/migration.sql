/*
  Warnings:

  - Added the required column `provinceId` to the `subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "provinceId" TEXT NOT NULL;
