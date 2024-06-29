-- CreateTable
CREATE TABLE `CategoryPrice` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prices` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `idCategoryPrice` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prices` ADD CONSTRAINT `Prices_idCategoryPrice_fkey` FOREIGN KEY (`idCategoryPrice`) REFERENCES `CategoryPrice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
