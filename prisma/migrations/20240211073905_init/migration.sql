/*
  Warnings:

  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `about`,
    DROP COLUMN `cover`,
    DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `Photo` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NULL,

    UNIQUE INDEX `Photo_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
