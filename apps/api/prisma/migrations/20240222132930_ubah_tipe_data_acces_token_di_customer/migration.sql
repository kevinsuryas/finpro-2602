/*
  Warnings:

  - You are about to alter the column `time_done` on the `order_history` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `accessToken` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `order_history` MODIFY `time_done` DATETIME NOT NULL;
