"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTokenCookie = exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGenerator = (id) => {
    const jwtsecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: '1d' });
    return token;
};
exports.tokenGenerator = tokenGenerator;
const setTokenCookie = (res, token) => {
    res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly`);
};
exports.setTokenCookie = setTokenCookie;
