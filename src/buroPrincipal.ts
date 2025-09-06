import express from "express";
const app = express();
const port = 4000;

// Buró principal siempre responde bien
app.get("/score", (req, res) => {
  res.json({ score: 750 });
});

app.listen(port, () => {
  console.log(`💳 Buró Principal en http://localhost:${port}`);
});
