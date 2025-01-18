const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inizializzazione dell'app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotta di prova
app.get("/", (req, res) => {
  res.send("Il server è in esecuzione!");
});

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
