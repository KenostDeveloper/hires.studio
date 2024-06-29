-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `iframeLink` VARCHAR(191) NOT NULL,
    `type` ENUM('Podcasts', 'LiveBroadcasts', 'Interview', 'ConversationalVideos') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
