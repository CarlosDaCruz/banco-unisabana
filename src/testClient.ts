import axios from "axios";

async function run() {
  let i = 1;
  while (true) {
    try {
      const res = await axios.get("http://localhost:3000/consulta-score");
      console.log(
        `#${i} ✅ Respuesta del banco: buro=${res.data.buro}, score=${res.data.data.score}`
      );
    } catch (err: any) {
      console.error(`#${i} ❌ Error en petición:`, err.message);
    }
    i++;
    await new Promise((resolve) => setTimeout(resolve, 2000)); // espera 2 segundos entre peticiones
  }
}

run();
