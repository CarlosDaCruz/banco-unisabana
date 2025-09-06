import express from "express";
import axios from "axios";
import { CircuitBreaker } from "./circuitBreaker";

const app = express();
const port = 3000;

// Instancia del Circuit Breaker: 50% de fallos, ventana de 10 requests, 30s de espera
const breaker = new CircuitBreaker(0.5, 10, 30000);

const primaryBureau = "http://localhost:4000/score";
const secondaryBureau = "http://localhost:5000/score";

app.get("/consulta-score", async (req, res) => {
  if (!breaker.canCall()) {
    console.log("⚡ Circuito OPEN → Usando buró secundario");
    try {
      const response = await axios.get(secondaryBureau);
      console.log("#2 Respuesta enviada al cliente: SECUNDARIO");
      return res.json({ buro: "SECUNDARIO", data: response.data });
    } catch {
      console.log("❌ Falla también en el buró secundario");
      return res.status(500).json({ error: "Fallo en el buró secundario" });
    }
  }

  try {
    const response = await axios.get(primaryBureau);
    breaker.record(true);
    console.log("#1 Respuesta enviada al cliente: PRINCIPAL");
    return res.json({ buro: "PRINCIPAL", data: response.data });
  } catch {
    breaker.record(false);
    console.log("❌ Error en buró principal, usando buró secundario");
    try {
      const response = await axios.get(secondaryBureau);
      console.log("#2 Respuesta enviada al cliente: SECUNDARIO");
      return res.json({ buro: "SECUNDARIO", data: response.data });
    } catch {
      console.log("🔥 Falla total: ni principal ni secundario responden");
      return res.status(500).json({ error: "Fallo en ambos burós" });
    }
  }
});

app.listen(port, () => {
  console.log(`🏦 Banco escuchando en http://localhost:${port}`);
});
