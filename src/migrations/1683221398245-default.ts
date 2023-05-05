import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683221398245 implements MigrationInterface {
    name = 'default1683221398245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
