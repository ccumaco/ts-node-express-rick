"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//config cors
const whitelist = [
    'http://localhost:3000',
    'https://rick-and-morty-73hzqdtl2-ccumaco.vercel.app/',
];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
};
//config
app.use(express_1.default.json());
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.use((0, cors_1.default)(corsOptions));
//routes
app.use('/api/v1', routes_1.default);
//server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
