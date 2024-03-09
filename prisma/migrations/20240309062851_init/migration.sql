/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `GoogleSheetAppSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoogleSheetAppSetting_storeId_key" ON "GoogleSheetAppSetting"("storeId");
