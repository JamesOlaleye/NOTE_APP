"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const noteController_1 = require("../controller/noteController");
const router = express_1.default.Router();
router.post('/add-note', auth_1.authentification, noteController_1.createNote);
router.get('/get-notes', noteController_1.getNotes);
router.get('/get-my-notes', auth_1.authentification, noteController_1.getMyNotes);
router.get('/get-note/:id', auth_1.authentification, noteController_1.getNote);
router.put('/update-note/:id', auth_1.authentification, noteController_1.updateNote);
router.delete('/delete-note/:id', auth_1.authentification, noteController_1.deleteNote);
exports.default = router;
