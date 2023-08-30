"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.signUp = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = __importDefault(require("../model/userModel"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, gender, phone, address, password, confirm_password } = req.body;
    const normalisedEmail = email.toLowerCase();
    const userExist = yield userModel_1.default.findOne({ where: { email: normalisedEmail } });
    if (userExist)
        return res.send('User already exist');
    try {
        const user = yield userModel_1.default.create({
            fullName,
            email: normalisedEmail,
            gender,
            phone,
            address,
            password,
            confirm_password
        });
        if (user) {
            const token = (0, utils_1.tokenGenerator)(user._id);
            (0, utils_1.setTokenCookie)(res, token);
            return res.status(201).json({
                msg: 'user created successfully',
                user,
                token
            });
        }
        else {
            return res.status(400).json({
                msg: 'user not created',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const normalisedEmail = email.toLowerCase();
    const user = yield userModel_1.default.findOne({ email: normalisedEmail });
    if (!user)
        return res.send('User does not exist');
    try {
        const isMatch = yield user.matchPassword(password);
        if (!isMatch)
            return res.send('Invalid password');
        const token = (0, utils_1.tokenGenerator)(user._id);
        (0, utils_1.setTokenCookie)(res, token);
        return res.status(200).json({
            msg: 'user logged in successfully',
            user,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
});
exports.signIn = signIn;
const signOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('token', '', { maxAge: 1 });
        return res.status(200).json({
            msg: 'user logged out successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
});
exports.signOut = signOut;
