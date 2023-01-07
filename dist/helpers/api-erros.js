"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
