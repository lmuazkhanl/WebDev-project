/*
  Warnings:

  - You are about to drop the `_CustomerToItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CustomerToItem_B_index";

-- DropIndex
DROP INDEX "_CustomerToItem_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CustomerToItem";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "customerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "moneyBalance" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    CONSTRAINT "Customer_id_fkey" FOREIGN KEY ("id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("customerId", "moneyBalance", "name", "password", "shippingAddress", "surname", "username") SELECT "customerId", "moneyBalance", "name", "password", "shippingAddress", "surname", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
