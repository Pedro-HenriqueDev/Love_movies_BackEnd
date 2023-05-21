"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1684634953441 = void 0;
class default1684634953441 {
    constructor() {
        this.name = 'default1684634953441';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" bytea`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }
}
exports.default1684634953441 = default1684634953441;
