/*
  Warnings:

  - A unique constraint covering the columns `[device_Id]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscribers_device_Id_key" ON "subscribers"("device_Id");
