/*
  Warnings:

  - You are about to drop the `Subscriber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_districtId_fkey";

-- DropTable
DROP TABLE "Subscriber";

-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "device_Id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "districtId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_phone_key" ON "subscribers"("phone");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
