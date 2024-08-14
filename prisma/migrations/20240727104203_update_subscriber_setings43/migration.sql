-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
