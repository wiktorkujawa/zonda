"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const orderbook_1 = __importDefault(require("./routes/orderbook"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use('/api', [
    orderbook_1.default,
]);
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.get('*', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
});
const PORT = process.env["PORT"] || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=index.js.map