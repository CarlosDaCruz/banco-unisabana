import express from "express";
const app = express();
const port = 5000;

// Este buró siempre responde
app.get("/score", (req, res) => {
  res.json({ score: 700 });
});

app.listen(port, () => {
  console.log(`📊 Buró Secundario en http://localhost:${port}`);
});
