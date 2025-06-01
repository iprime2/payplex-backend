import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToPage1748797552215 implements MigrationInterface {
    name = 'AddSlugToPage1748797552215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "UQ_875a4ba4aebdc1855dbf176dadb" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "UQ_875a4ba4aebdc1855dbf176dadb"`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "slug"`);
    }

}
