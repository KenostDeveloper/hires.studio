-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `type` ENUM('Interior', 'Podcaster', 'DressingRoom') NULL;

-- AlterTable
ALTER TABLE `Video` MODIFY `type` ENUM('Podcasts', 'LiveBroadcasts', 'Interview', 'ConversationalVideos') NULL;
