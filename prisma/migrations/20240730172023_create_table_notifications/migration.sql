-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "subscriber_Id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_subscriber_Id_fkey" FOREIGN KEY ("subscriber_Id") REFERENCES "subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
