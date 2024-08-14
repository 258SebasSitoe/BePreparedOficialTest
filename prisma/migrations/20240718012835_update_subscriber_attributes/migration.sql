-- AlterTable
ALTER TABLE "subscribers" ALTER COLUMN "device_Id" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;
