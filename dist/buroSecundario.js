"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
// Este buró siempre responde
app.get("/score", (req, res) => {
    res.json({ score: 700 });
});
app.listen(port, () => {
    console.log(`📊 Buró Secundario en http://localhost:${port}`);
});
//# sourceMappingURL=buroSecundario.js.map