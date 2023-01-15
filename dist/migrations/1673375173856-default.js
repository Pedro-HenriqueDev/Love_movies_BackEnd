"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1673375173856 = void 0;
class default1673375173856 {
    constructor() {
        this.name = 'default1673375173856';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users_movies" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD CONSTRAINT "FK_83c9089262a408c5652afb9939f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users_movies" DROP CONSTRAINT "FK_83c9089262a408c5652afb9939f"`);
        await queryRunner.query(`ALTER TABLE "users_movies" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_movies" ADD "user_id" integer NOT NULL`);
    }
}
exports.default1673375173856 = default1673375173856;
