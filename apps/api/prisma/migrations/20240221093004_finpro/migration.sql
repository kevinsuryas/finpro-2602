/*
  Warnings:

  - You are about to alter the column `time_done` on the `order_history` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `name` VARCHAR(50) NULL,
    MODIFY `phone_number` VARCHAR(14) NULL,
    MODIFY `longitude` VARCHAR(10) NULL,
    MODIFY `latitude` VARCHAR(9) NULL;

-- AlterTable
ALTER TABLE `order_history` MODIFY `time_done` DATETIME NOT NULL;
