/*
  Warnings:

  - Added the required column `message` to the `alerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `alerts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
