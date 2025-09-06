"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function run() {
    let i = 1;
    while (true) {
        try {
            const res = await axios_1.default.get("http://localhost:3000/consulta-score");
            console.log(`#${i} ✅ Respuesta del banco: buro=${res.data.buro}, score=${res.data.data.score}`);
        }
        catch (err) {
            console.error(`#${i} ❌ Error en petición:`, err.message);
        }
        i++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // espera 2 segundos entre peticiones
    }
}
run();
//# sourceMappingURL=testClient.js.map