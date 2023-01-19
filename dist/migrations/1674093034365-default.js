"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1674093034365 = void 0;
class default1674093034365 {
    constructor() {
        this.name = 'default1674093034365';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }
}
exports.default1674093034365 = default1674093034365;
