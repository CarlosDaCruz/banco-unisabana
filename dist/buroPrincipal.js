"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
// Buró principal siempre responde bien
app.get("/score", (req, res) => {
    res.json({ score: 750 });
});
app.listen(port, () => {
    console.log(`💳 Buró Principal en http://localhost:${port}`);
});
//# sourceMappingURL=buroPrincipal.js.map