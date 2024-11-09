import { MigrationInterface, QueryRunner } from "typeorm";

export class ApdateTableEntity1731155846015 implements MigrationInterface {
    name = 'ApdateTableEntity1731155846015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}
