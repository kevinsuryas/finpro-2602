-- CreateTable
CREATE TABLE `Order_Status` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Order_Status_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_status_id` VARCHAR(191) NOT NULL,
    `time_done` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Complaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` MEDIUMTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outlet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(14) NOT NULL,
    `longitude` VARCHAR(10) NOT NULL,
    `latitude` VARCHAR(9) NOT NULL,
    `active` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outlet_Worker_Shift` (
    `id` VARCHAR(191) NOT NULL,
    `outlet_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `time_start` TIME NOT NULL,
    `time_end` TIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outlet_Worker` (
    `id` VARCHAR(191) NOT NULL,
    `outlet_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(14) NULL,
    `type` ENUM('admin', 'ironing', 'washing', 'packing') NOT NULL,
    `shift_id` VARCHAR(191) NOT NULL,
    `active` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Super_Admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(14) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` VARCHAR(191) NOT NULL,
    `outlet_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(14) NOT NULL,
    `longitude` VARCHAR(10) NOT NULL,
    `latitude` VARCHAR(9) NOT NULL,
    `active` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category_Detail_Order` (
    `id` VARCHAR(191) NOT NULL,
    `item_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Order` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `category_detail_order_id` VARCHAR(191) NOT NULL,
    `item_qty` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(14) NOT NULL,
    `email` VARCHAR(50) NULL,
    `password` VARCHAR(191) NULL,
    `longitude` VARCHAR(10) NOT NULL,
    `latitude` VARCHAR(9) NOT NULL,
    `active` TINYINT NOT NULL,
    `verified` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer_Address` (
    `id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `recipient_name` VARCHAR(50) NOT NULL,
    `recipient_address` VARCHAR(50) NOT NULL,
    `longitude` VARCHAR(10) NOT NULL,
    `latitude` VARCHAR(9) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `outlet_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `customer_address` VARCHAR(191) NOT NULL,
    `driver_pickup_id` VARCHAR(191) NOT NULL,
    `driver_delivery_id` VARCHAR(191) NULL,
    `order_history_id` INTEGER NULL,
    `complaint_id` INTEGER NULL,
    `weight` FLOAT NULL,
    `laundry_price` INTEGER NULL,
    `pickup_fee` INTEGER NOT NULL,
    `delivery_fee` INTEGER NOT NULL,
    `active` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order_History` ADD CONSTRAINT `Order_History_order_status_id_fkey` FOREIGN KEY (`order_status_id`) REFERENCES `Order_Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outlet_Worker_Shift` ADD CONSTRAINT `Outlet_Worker_Shift_outlet_id_fkey` FOREIGN KEY (`outlet_id`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outlet_Worker` ADD CONSTRAINT `Outlet_Worker_outlet_id_fkey` FOREIGN KEY (`outlet_id`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outlet_Worker` ADD CONSTRAINT `Outlet_Worker_shift_id_fkey` FOREIGN KEY (`shift_id`) REFERENCES `Outlet_Worker_Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_outlet_id_fkey` FOREIGN KEY (`outlet_id`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Order` ADD CONSTRAINT `Detail_Order_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Order` ADD CONSTRAINT `Detail_Order_category_detail_order_id_fkey` FOREIGN KEY (`category_detail_order_id`) REFERENCES `Category_Detail_Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer_Address` ADD CONSTRAINT `Customer_Address_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_outlet_id_fkey` FOREIGN KEY (`outlet_id`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_driver_pickup_id_fkey` FOREIGN KEY (`driver_pickup_id`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_driver_delivery_id_fkey` FOREIGN KEY (`driver_delivery_id`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_order_history_id_fkey` FOREIGN KEY (`order_history_id`) REFERENCES `Order_History`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `Detail_Complaint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
