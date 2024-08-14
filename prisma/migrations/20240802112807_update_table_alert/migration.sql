/*
  Warnings:

  - You are about to drop the `Alerts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alerts" DROP CONSTRAINT "Alerts_districtId_fkey";

-- DropForeignKey
ALTER TABLE "Alerts" DROP CONSTRAINT "Alerts_provinceId_fkey";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "districtId" TEXT,
ADD COLUMN     "provinceId" TEXT;

-- DropTable
DROP TABLE "Alerts";

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
