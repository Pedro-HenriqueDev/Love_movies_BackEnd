import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673375173856 implements MigrationInterface {
    name = 'default1673375173856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_movies" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD CONSTRAINT "FK_83c9089262a408c5652afb9939f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_movies" DROP CONSTRAINT "FK_83c9089262a408c5652afb9939f"`);
        await queryRunner.query(`ALTER TABLE "users_movies" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD "user_id" integer NOT NULL`);
    }

}
