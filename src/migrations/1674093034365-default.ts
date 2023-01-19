import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674093034365 implements MigrationInterface {
    name = 'default1674093034365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
