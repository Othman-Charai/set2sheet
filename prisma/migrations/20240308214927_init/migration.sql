/*
  Warnings:

  - Added the required column `storeId` to the `GoogleSheetAppSetting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GoogleSheetAppSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicKey" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "storeId" TEXT NOT NULL
);
INSERT INTO "new_GoogleSheetAppSetting" ("id", "publicKey", "secretKey") SELECT "id", "publicKey", "secretKey" FROM "GoogleSheetAppSetting";
DROP TABLE "GoogleSheetAppSetting";
ALTER TABLE "new_GoogleSheetAppSetting" RENAME TO "GoogleSheetAppSetting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
