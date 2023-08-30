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
exports.getMyNotes = exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const noteModel_1 = __importDefault(require("../model/noteModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate, status } = req.body;
        const note = yield noteModel_1.default.create({ title, description, dueDate, status, userId: req.userId });
        yield userModel_1.default.findByIdAndUpdate(req.userId, { $push: { notes: note._id } }).populate('notes');
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createNote = createNote;
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteModel_1.default.findById(req.params.id);
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNote = getNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteModel_1.default.findById(req.params.id);
        if (!note)
            return res.status(404).json("Note not found");
        const noteCreator = note.userId.toString();
        if (noteCreator !== req.userId)
            return res.status(401).json("You are not authorized to update this note");
        const { title, description, dueDate, status, userId } = req.body;
        yield noteModel_1.default.findByIdAndUpdate(req.params.id, { title, description, dueDate, status, userId });
        res.status(200).json("Note updated successfully");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteModel_1.default.findById(req.params.id);
        if (!note)
            return res.status(404).json("Note not found");
        const noteCreator = note.userId.toString();
        if (noteCreator !== req.userId)
            return res.status(401).json("You are not authorized to delete this note");
        yield noteModel_1.default.findByIdAndDelete(req.params.id);
        yield userModel_1.default.findByIdAndUpdate(req.userId, { $pull: { notes: req.params.id } });
        res.status(200).json("Note deleted successfully");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteNote = deleteNote;
const getMyNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find({ userId: req.userId });
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMyNotes = getMyNotes;
