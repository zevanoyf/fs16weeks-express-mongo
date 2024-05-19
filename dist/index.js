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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const note_1 = require("./models/note");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allNotes = yield note_1.Note.find();
    res.json(allNotes);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const newNote = new note_1.Note({
        title,
        content,
    });
    yield newNote.save();
    res.json({ message: "Note added" });
}));
app.listen(8000);
