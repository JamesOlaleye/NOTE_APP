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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.getUser = exports.signup = void 0;
const user_1 = require("../model/user");
const uuid_1 = require("uuid");
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newId = (0, uuid_1.v4)();
        const newUser = yield user_1.User.create(Object.assign({ id: newId }, req.body));
        console.log(newUser);
        res.status(201).json({
            message: "user created successfully!",
        });
    });
}
exports.signup = signup;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const myUser = yield user_1.User.findOne({
                where: { id: id },
            });
            if (myUser) {
                return res.json({
                    data: myUser,
                });
            }
            res.status(404).json({
                error: 'User not found',
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    });
}
exports.getUser = getUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield user_1.User.findAll();
            res.json(allUsers);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.getAllUsers = getAllUsers;
/**user delete his account*/
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ where: { id: req.params.id } });
            if (user) {
                yield user.destroy();
                res.redirect(200, '/users');
            }
            else {
                throw new Error('User not found');
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updates = req.body;
        try {
            const user = yield user_1.User.findOne({ where: { id } });
            if (user) {
                Object.assign(user, Object.assign(Object.assign({}, user), updates));
                yield user.save();
                res.redirect(200, `/users/${id}`);
            }
            else {
                throw new Error("User not found!");
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.updateUser = updateUser;
