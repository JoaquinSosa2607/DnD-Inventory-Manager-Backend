import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1752533240137 implements MigrationInterface {
    name = 'InitMigration1752533240137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`campaign\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`armor\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`armor\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`character\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`character\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`weapon\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`weapon\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`weapon\` CHANGE \`type\` \`type\` enum ('Simple', 'Distance, Simple', 'Martial', 'Distance, Martial') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weapon\` CHANGE \`type\` \`type\` enum ('Simple', 'Distanc', 'Simple', 'Martial', 'Distanc', 'Martial') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weapon\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`weapon\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`character\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`character\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`armor\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`armor\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`campaign\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`campaign\` DROP COLUMN \`createdAt\``);
    }

}
